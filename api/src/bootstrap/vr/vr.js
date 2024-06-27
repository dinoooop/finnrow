import { vra } from "./vra.js"
import { vri } from "./vri.js"

// validator handler
export class vr {

    static validate(formValues, formName) {
        const updatedErrors = {}
        Object.entries(formValues).forEach(([key, value]) => {
            updatedErrors[key] = vra.avlVal(formName, key, value, formValues)
        })
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        const firstError = vri.findFirstNonFalseValue(updatedErrors)
        return { firstError, updatedErrors, allErrorsFalse }
    }

}