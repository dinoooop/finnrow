import { useRef } from "react"
import { fm } from "./fm";

export default function ({ name, type, formValues, errors, onChangeForm, label = null, id = null }) {
    const fileInputRef = useRef()
    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const values = formValues[name + '_urls'] ?? []
    const error = errors[name] ?? ''

    return (
        <div className="form-group">
            <label>{newLabel}</label>
            <label htmlFor={newId}><i className="fas fa-file icon"></i></label>
            <input
                type="file"
                ref={fileInputRef}
                id={newId}
                name={name}
                onChange={onChangeForm}
                multiple={true}
            />
            <div className="uploaded-images">
                {
                    values.map((value, index) => (
                        <img key={index} src={value} alt={`${newLabel} preview`} />
                    ))
                }
            </div>
            <div className="color-red">{error}</div>
        </div>
    )
}