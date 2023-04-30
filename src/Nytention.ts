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

/**
 * 
 * @param type - "key:type:allowedNullKey?"
 * @param data - jsonData
 * @returns allowedNull, notEqual
 */
export const autoTypeChecker = (type: string[], data: object) => {
    const allowedNull: {[x: string]: boolean} = {}
    const notEqual: string[] = []
    for (const item of type) {
        const key = item.split(":")[0]
        const type = item.split(":")[1]
        const allowedNullKey = item.split(":")[2]
        const keyArr = key.split(".")
        const value = keyArr.reduce((acc: { [x: string]: any }, cur: string | number) => acc && acc[cur], data) || undefined;
        if (allowedNullKey) { // 하나만 null이 아니어도 될 때
            if (!allowedNull.hasOwnProperty(allowedNullKey) || !allowedNull[allowedNullKey]) {
                if (value === undefined) allowedNull[allowedNullKey] = false;
                else allowedNull[allowedNullKey] = true;
            }
            else if (typeof(value) !== type) notEqual.push(key)
        }
        else {
            if (typeof(value) !== type) notEqual.push(key)
        }
    }
    return {
        allowedNull,
        notEqual
    }
}