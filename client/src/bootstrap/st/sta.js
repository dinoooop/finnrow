import { stb } from "./stb"

export class sta {

    static status(context = null) {
        const stDataLocal = stb.localData()

        switch (context) {
            case 'user':
                return stDataLocal ? stDataLocal.status_user : []

            default:
                return stDataLocal ? stDataLocal.status : []

        }
    }

    static roles() {
        const stDataLocal = stb.localData()
        return (stDataLocal && stDataLocal.roles) ? stDataLocal.roles : []
    }

    static accounts() {
        const stDataLocal = stb.localData()
        return stDataLocal ? stDataLocal?.accounts : []
    }

}