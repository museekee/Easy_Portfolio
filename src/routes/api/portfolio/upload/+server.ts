import type { RequestEvent } from "@sveltejs/kit"
import * as Const from "./../../../../const"
import { autoTypeChecker, encrypt, isEmptyObject, random } from "../../../../libs/Nytention"
import { uploadPortfolio } from "./../../../../libs/DB"

export async function POST(req: RequestEvent) {
    try {
        const body: {
            mdList: { key: string, value: string },
            type: string,
            code: string
        } = await req.request.json()
        console.log(body)
        const code: Const.DefType = JSON.parse(body.code)
        if (isEmptyObject(code)) return new Response(JSON.stringify({ code: 403, reason: "빈 코드" }))
        // console.log(body, code, isEmptyObject(code))
        if (!Const.TypeList.includes(body.type)) return new Response(JSON.stringify({ code: 403, reason: "이상한 타입" }))

        // 이상한 템플릿이거나 빈 코드가 아님
        
        //@ts-ignore
        const typeChecked = autoTypeChecker(Const[`${body.type}Typecheck`], code)
        const notEqual = typeChecked.notEqual
        const notEqualRightType = typeChecked.notEqualRightType
        const cantNull = []

        for (const [key, value] of Object.entries(typeChecked.allowedNull)) {
            if (!value) cantNull.push(key)
        }
        if (notEqual.length > 0 || cantNull.length > 0) return new Response(JSON.stringify({ 
            code: 403,
            reason: `타입 불일치 : ${
                notEqual.map((v, i) => `${v} (${notEqualRightType[i]})`).join(", ")
            }\nNull : ${
                cantNull.join(", ")
            }` 
        }))
        await uploadPortfolio({
            type: body.type,
            id: encrypt(random(0, 1000000)),
            createdAt: new Date().getMilliseconds(),
            lastUpdated: new Date().getMilliseconds(),
            maker: "누군가",
            MD: body.mdList,
            data: code
        })
        return new Response(JSON.stringify({ code: 200 }))
    }
    catch (err: any) {
        if (err instanceof SyntaxError) {
            const e = err as SyntaxError
            return new Response(JSON.stringify({ code: 403, reason: "JSON 문법오류" }))
        }
        else return new Response(JSON.stringify({ code: 403, reason: err }))
    }
}