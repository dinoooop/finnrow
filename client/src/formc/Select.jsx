import { fm } from "./fm";

export default function ({ name, formValues, errors, onChangeForm, optionType, showEmpty = true, label = null, id = null }) {

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
                    showEmpty &&
                    <option key="empty" value="">--select-</option>
                }
                {
                    options.map(mapitem => (
                        <option key={mapitem._id} value={mapitem._id}>
                            {mapitem.name}
                        </option>
                    ))
                }
            </select>
            <div className="color-red">{error}</div>
        </div>
    )
}