import { useEffect, useState } from "react"
import { fm } from "./fm"
import config from "../config"
import axios from "axios"

export default function ({ name, formValues, endpoint, errors, onChangeForm, label = null, id = null }) {

    if (!endpoint) {
        console.error("Single select auto missing endpoint");
    }

    const newId = id ?? name
    const newLabel = label ?? fm.getLabel(name)
    const value = formValues[name] ?? null
    const error = errors[name] ?? ""
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState("")
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() => {
        fetchDefaultOptions()
    }, [])

    useEffect(() => {
        setSelected(value)
    }, [value])

    useEffect(() => {
        fetchSelectedOption()
    }, [selected])

    const fetchDefaultOptions = async () => {
        try {
            const response = await axios.get(`${config.api}/select-auto/${endpoint}`)
            setOptions(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const fetchSelectedOption = async () => {
        try {
            const response = await axios.post(`${config.api}/select-auto/${endpoint}`, { id: selected })
            setSelectedOption(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const onClickItem = assignItem => {
        setSelected(prevSelected => prevSelected === assignItem ? null : assignItem)
    }

    const onSearch = async (e) => {
        const search = e.target.value
        const response = await axios.get(`${config.api}/select-auto/${endpoint}?search=${search}`)
        setOptions(response.data)
    }

    const onSelect = (e) => {
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
                        selectedOption &&
                        <div className="assign-item-list checked">
                            <div className='info'>{selectedOption?.name}</div>
                            <i className="fa-solid fa-xmark" onClick={() => onClickItem(selectedOption._id)}></i>
                        </div>
                    }
                </div>
            }

            <div className="color-red">{error}</div>

            {
                showModal &&
                <div className="modal">
                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>

                    <div className="modal-content">
                        <input type="text" className="form-control input-field" placeholder="Search" onChange={onSearch} />
                        <div className="modal-scroll-content">
                            <div className="option-items">
                                {
                                    options.map(option => {
                                        let checked = option._id === selected ? 'checked' : ''
                                        return (
                                            <div key={option._id} className={'assign-item-list ' + checked} onClick={() => onClickItem(option._id)}>
                                                <div className='info'>{option.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button
                            type="button"
                            data-custom-field="single-select"
                            data-custom-value={selected}
                            data-custom-name={name}
                            onClick={onSelect}
                            className="btn"
                        >Done</button>
                    </div>
                </div>
            }
        </div>
    )
}