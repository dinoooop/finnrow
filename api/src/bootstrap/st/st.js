import { sta } from "./sta.js";
import { stb } from "./stb.js";

export class st {

    static status(param = null) {
        const data = sta.status()
        return stb.propReturn(param, data);
    }

    static roles(param = null) {
        const data = sta.roles()
        return stb.propReturn(param, data);
    }

    static async accounts(param = null) {
        const data = await sta.accounts()
        return stb.propReturn(param, data);
    }

}