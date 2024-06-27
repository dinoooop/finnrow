import { vrb } from "./vrb.js";

// validator
export class vra {
    static avlVal(formName, key, value, formValues) {
        switch (formName) {
            case "valUserUpdate":
                return vrb.valUserUpdate(key, value, formValues)
            default:
                return vrb.valCommon(key, value, formValues)
        }
    }
}