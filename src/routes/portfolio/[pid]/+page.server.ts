import type { RequestEvent } from "@sveltejs/kit"
import { getPortfolio } from "../../../libs/DB"

export const load = async ({ params }: RequestEvent) => {
    return {
        data: (await getPortfolio(params.pid ?? ""))[0]
    }
}