import { stb } from "./stb";
import { sta } from "./sta";

export class st {

    static status(param = null, context = null) {
        const data = sta.status(context)
        return stb.propReturn(param, data);
    }

    static roles(param = null) {
        const data = sta.roles()
        return stb.propReturn(param, data);
    }

    static accounts(param = null) {
        const data = sta.accounts()
        return stb.propReturn(param, data);
    }

}