import type { RequestEvent } from "@sveltejs/kit"
import * as Const from "../../../const"

export const load = async ({ params, fetch }: RequestEvent) => {
    const typeList = Const.TypeList
    return {
        typeList
    }
}