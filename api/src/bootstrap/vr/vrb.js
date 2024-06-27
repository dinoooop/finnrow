import { vri } from "./vri.js"

export class vrb {

    static valUserUpdate(key, value, formValues) {
        switch (key) {
            case "name":
                return vri.commonRequireValidation(key, value)
            case "email":
                return vri.commonEmailValidation(value)
            default:
                return false;
        }
    }

    static valCommon(key, value, formValues) {
        switch (key) {
            case "title":
            case "name":
            case "password":
                return vri.commonRequireValidation(key, value)
            case "email":
                return vri.commonEmailValidation(value)
            default:
                return false;
        }
    }
}