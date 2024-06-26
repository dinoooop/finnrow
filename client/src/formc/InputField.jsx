import { bc } from "../helpers/bc";
import { fm } from "./fm";

export default function ({ name, formValues, errors, onChangeForm, type = null, label = null, id = null }) {

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    let value = formValues[name] ?? ""
    const error = errors[name] ?? ""

    let newType = ''
    if (type) {
        newType = type;
    } else {
        newType = (name === "email" || name === "password") ? name : "text"
    }

    return (
        <div className="form-group">
            <label htmlFor={newId}>{newLabel}</label>
            <input type={newType}
                className="form-control input-field"
                id={newId}
                value={value}
                name={name}
                onChange={onChangeForm}
            />
            <div className="color-red">{error}</div>
        </div>
    )
}