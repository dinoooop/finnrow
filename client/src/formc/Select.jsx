import { fm } from "./fm";

export default function ({ name, formValues, errors, onChangeForm, optionType, label = null, id = null }) {

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const value = formValues[name] ?? []
    const error = errors[name] ?? ""

    const newOptionType = optionType ?? name;
    const options = fm.getOptions(newOptionType);

    return (
        <div className="form-group">
            <label htmlFor={newId}>{newLabel}</label>
            <select
                id={newId}
                name={name}
                onChange={onChangeForm}
                value={value}
                className="form-control"
            >
                {
                    options.map(mapitem => (
                        <option key={mapitem.key} value={mapitem.key}>
                            {mapitem.name}
                        </option>
                    ))
                }
            </select>
            <div className="color-red">{error}</div>
        </div>
    )
}