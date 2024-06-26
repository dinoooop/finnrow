// validator
export class vr {

    static validate(formValues, validateForm) {
        const updatedErrors = {}
        Object.entries(formValues).forEach(([key, value]) => {
            if (validateForm) {
                updatedErrors[key] = validateForm(key, value, formValues)
            } else {
                updatedErrors[key] = this.commonValidation(key, value, formValues)
            }
        })
        const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)
        return { updatedErrors, allErrorsFalse }
    }

    static commonValidation(key, value, formValues) {
        switch (key) {

            case "title":
                if (value.length === 0) { return "Title required" } else { return false }

            case "email":
                if (value.length === 0) {
                    return "Email required";
                } else {
                    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    return !regex.test(value) ? "Email not valid" : false;
                }

            case "password":
                if (value.length === 0) {
                    return "Password required"
                } else {
                    return false
                }

            default:
                return false;

        }
    }
}

