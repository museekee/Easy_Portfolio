import * as Const from "../../../../const"

export async function GET() {
    return new Response(JSON.stringify({ code: 200, data: Const.TypeList }))
}