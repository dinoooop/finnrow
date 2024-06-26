import { useState } from "react";
import { fm } from "./fm";
import { dummyCountry } from "./dummyItems";

export default function ({ name, formValues, errors, onChangeForm, type = null, label = null, id = null }) {

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const values = formValues[name] ?? []
    const error = errors[name] ?? ""
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState(values)

    const options = dummyCountry

    const onClickItem = assignItem => {
        setSelected(fm.toggleArrayItem(assignItem, selected))
    }

    const handleSelect = (e) => {
        setShowModal(false)
        onChangeForm(e)
    }

    return (
        <div className="form-group">
            <label htmlFor={newId}>{newLabel}</label>
            <i className="fa-solid fa-plus icon" onClick={() => setShowModal(true)}></i>

            {
                <div className="option-items">
                    {
                        selected.map((id, index) => {
                            let option = fm.findItemById(id, options)
                            return (
                                <div key={index} className="assign-item-list checked">
                                    <div className='info'>{option.name}</div>
                                    <i className="fa-solid fa-xmark" onClick={() => onClickItem(option.id)}></i>
                                </div>
                            );
                        })
                    }
                </div>
            }

            <div className="color-red">{error}</div>

            {
                showModal &&
                <div className="modal">
                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>

                    <div className="modal-content">
                        <input type="text" className="form-control input-field" placeholder="Search" value="" onChange={onChangeForm} />
                        <div className="modal-scroll-content">
                            <div className="option-items">
                                {
                                    options.map((option, index) => {
                                        let checked = fm.inArray(option.id, selected) ? 'checked' : '';
                                        return (
                                            <div key={index} className={'assign-item-list ' + checked} onClick={() => onClickItem(option.id)}>
                                                <div className='info'>{option.name}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <button
                            type="button"
                            data-custom-field="multi-select"
                            data-custom-values={selected}
                            data-custom-name={name}
                            onClick={handleSelect}
                            className="btn"
                        >Done</button>
                    </div>
                </div>
            }
        </div>
    )
}