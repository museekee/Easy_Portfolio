export const TypeList = ["Facebook", "Windows"]

export interface DefType {
    backgroundColor?: string
    backgroundImage?: string
    textColor: string
    contents: {
        text: string
        name: string
    }[]
}
export const DefData = {
    backgroundColor: "#222222",
    textColor: "#eeeeee",
    contents: [
        {
            title: "기본 내용",
            text: "+{defText}"
        }
    ]
}
export const DefDataTypecheck = [
    "backgroundColor:string:DEF_BG",
    "backgroundImage:string:DEF_BG",
    "textColor:string",
    "contents:object"
]

export interface FacebookType extends DefType {
    profilePicture: string
    profileBack: string
    aboutMe: string
    profile: {
        title: string
        text: string
    }[]
}
export const DefFacebook = Object.assign(DefData, {
    type: "Facebook",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    profilePicture: "url",
    profileBack: "url",
    aboutMe: "",
    profile: [
        {
            title: "기본 프로필",
            text: "+{defText}"
        }
    ]
})
export const FacebookTypecheck = [
    "profilePicture:string",
    "profileBack:string",
    "aboutMe:string",
    "profile:object"
].concat(DefDataTypecheck)