// validator independent fucntions
export class vri {

    static commonEmailValidation(value) {
        if (value.length === 0) {
            return "Email required";
        } else {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return !regex.test(value) ? "Email not valid" : false;
        }
    }

    static commonRequireValidation(key, value) {
        const fUpper = key.charAt(0).toUpperCase() + key.slice(1)
        if (value.length === 0) { return fUpper + " required" } else { return false }
    }

    static findFirstNonFalseValue(obj) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                if (value !== false) {
                    return value;
                }
            }
        }
        return null;
    }
}