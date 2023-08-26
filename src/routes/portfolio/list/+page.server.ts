import { getPortfolioList } from "../../../libs/DB"

export const load = async () => {
    return {
        portfolios: await getPortfolioList()
    }
}