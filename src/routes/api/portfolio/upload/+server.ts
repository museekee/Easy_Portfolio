import type { RequestEvent } from "@sveltejs/kit"
import * as Const from "./../../../../const"
import { autoTypeChecker, isEmptyObject } from "../../../../Nytention"

export async function POST(req: RequestEvent) {
    try {
        const body: {
            mdList: { key: string, value: string },
            type: string,
            code: string
        } = await req.request.json()
        console.log(body)
        const code = JSON.parse(body.code)
        if (isEmptyObject(code)) return new Response(JSON.stringify({ code: 403, reason: "빈 코드" }))
        // console.log(body, code, isEmptyObject(code))
        if (!Const.hasOwnProperty(`${body.type}Typecheck`)) return new Response(JSON.stringify({ code: 403, reason: "이상한 타입" }))
        //@ts-ignore
        const typeChecked = autoTypeChecker(Const[`${body.type}Typecheck`], code)
        const notEqual = typeChecked.notEqual
        const notEqualRightType = typeChecked.notEqualRightType
        const cantNull = []
        console.log(typeChecked.allowedNull)
        for (const [key, value] of Object.entries(typeChecked.allowedNull)) {
            console.log(key)
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
        return new Response(JSON.stringify({ code: 200 }))
    }
    catch (err: any) {
        if (err instanceof SyntaxError) {
            const e = err as SyntaxError
            return new Response(JSON.stringify({ code: 403, reason: "JSON 문법오류" }))
        }
        else return new Response(JSON.stringify({ code: 403, reason: err.name }))
    }
}