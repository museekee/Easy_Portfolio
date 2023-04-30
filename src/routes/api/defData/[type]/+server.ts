import type { RequestEvent, RequestHandler } from '../$types'
import * as Const from "./../../../../const"

export async function GET({ params }: RequestEvent) {
    if (!Object.keys(Const).includes(`Def${params.type}`)) return new Response(JSON.stringify({ code: 404 }))
    //@ts-ignore
    return new Response(JSON.stringify({ code: 200, data: Const[`Def${params.type}`] }))
}