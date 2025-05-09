class UsersReq {
    nickname: string
    email: string
    constructor(id: number, nickname: string, email: string) {
        this.nickname = nickname
        this.email = email
    }
}

class Users {
    id: number
    nickname: string
    email: string
    constructor(id: number, nickname: string, email: string) {
        this.id = id
        this.nickname = nickname
        this.email = email
    }
}


export { Users, UsersReq };