import crypto from "crypto"

/** min max 포함 */
export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const encrypt = (text: string | number) => {
    const value = text.toString()
    const shasum = crypto.createHash("sha1")
    shasum.update(value)
    const firstSplit = shasum.digest('hex').split("")
    firstSplit[random(0, firstSplit.length - 1)] += random(0, 99999999)
    const first = firstSplit.join("")
    shasum.update(first)
    return shasum.digest("hex")
}