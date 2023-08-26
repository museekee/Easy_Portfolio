import { getPortfolioList } from "../../../../libs/DB";

export async function GET() {
    return new Response(JSON.stringify({ code: 200, data: await getPortfolioList() }))
}