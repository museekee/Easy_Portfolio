import knexModule from "knex"
import path from "path"

const __dirname = path.resolve()

console.log(__dirname)
const knex = knexModule({
    client: 'better-sqlite3',
    connection: {
      filename: `${path.join(__dirname, "src/DB.db")}`
    },
    useNullAsDefault: true
})


export const uploadPortfolio = async ({
    type, id, createdAt, lastUpdated, maker, MD, data
}: {
    type: string, id: string, createdAt: number, lastUpdated: number, maker: string, MD: object, data: object
}) => {
    const result = await knex('Portfolios').insert({TYPE: type, ID: id, CREATED_AT: createdAt, LAST_UPDATED: lastUpdated, MAKER: maker, MD: JSON.stringify(MD), DATA: JSON.stringify(data)})
    console.log(type, id, createdAt, lastUpdated, maker, data)
    return true
}
export const getPortfolioList = async () => {
    return await knex("Portfolios")
}
export const getPortfolio = async (pid: string) => {
    return await knex("Portfolios").where("ID", pid)
}