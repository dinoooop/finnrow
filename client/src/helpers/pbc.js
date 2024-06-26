import store from '../store'
import { dummyLogin, dummyRegister } from './dummyData';



// Project Basic Functions
export class pbc {

    static dummy(key) {
        let data = {}

        switch (key) {
            case 'register': data = dummyRegister; break;
            case 'login': data = dummyLogin; break;
            default:
                break;
        }

        return (process.env.REACT_APP_DATA === 'DUMMY') ? data : this.setEmpty(data);

    }

    static setEmpty(obj) {
        const resetObj = {};

        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                resetObj[key] = '';
            } else if (Array.isArray(obj[key])) {
                resetObj[key] = [];
            } else {
                resetObj[key] = '';
            }
        }

        return resetObj;
    }



}
