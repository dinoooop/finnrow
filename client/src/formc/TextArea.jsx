import { fm } from "./fm";


export default function ({ name, formValues, errors, onChangeForm, label = null, id = null }) {

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const value = formValues[name] ?? ""
    const error = errors[name] ?? ""

    return (
        <div className="form-group">
            <label htmlFor={newId}>{newLabel}</label>
            <textarea
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