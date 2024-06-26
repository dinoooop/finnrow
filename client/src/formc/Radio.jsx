import { fm } from "./fm";

export default function ({ name, formValues, errors, onChangeForm, optionType=null, label = null, id = null }) {

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const value = formValues[name] ?? []
    const error = errors[name] ?? ""
    
    const newOptionType = optionType?? name;
    const options = fm.getOptions(newOptionType);

    return (
        <div className="form-group">
            <label htmlFor={newId}>{newLabel}</label>
            {
                options.map(option => (
                    <label className='radio-control' key={option.key}>
                        <input type="radio"
                            value={option.id}
                            name={name}
                            onChange={onChangeForm}
                            checked={value == option.id || ''}
                        /> {option.name}
                    </label>
                ))
            }
            <div className="color-red">{error}</div>
        </div>
    )
}