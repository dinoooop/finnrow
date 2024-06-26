export const validateForm = (key, value) => {
    switch (key) {
        case "name":
            return (value.length === 0) ? "Name equired" : false;
        default:
            return false;
    }
}