import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateForm } from './entryValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useEntryStore from './useEntryStore'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import SingleSelectAuto from '../../formc/SingleSelectAuto'
import { bc } from '../../helpers/bc'
import useQnoteStore from '../qnote/useQnoteStore'

export default function () {

    const navigate = useNavigate()

    const { reset, store, error } = useEntryStore()
    const {items: qnoteItems, index: qnoteIndex } = useQnoteStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({})
    const [qnote, setQnote] = useState('')

    useEffect(() => {
        qnoteIndex()
        reset()
        // Set default
        setFormValues({
            date: bc.getDate()
        })
    }, [])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submitFile(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await store(newFormData)
                navigate('/admin/entries')
            } catch (error) {
                console.error(error)
            }
        }
    }
    
    const onClickItem = async (item) => {
        setQnote(item)
        setFormValues(prev => ({ ...prev, note: item.note, account: item.account._id }))
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Entry</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="date" type="date" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="price" type="price" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="note" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <SingleSelectAuto name="account" endpoint="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/entries" />

                    </form>
                </div>
                <div className='cardbody col-lg-6'>
                    {
                        <div className="option-items">
                            {
                                qnoteItems &&
                                qnoteItems.map(item => {
                                    let checked = item._id === qnote._id ? 'checked' : ''
                                    return (
                                        <div key={item._id} onClick={() => onClickItem(item)} className={'assign-item-list assign-qnote ' + checked}>
                                            <div className='info'>{item?.note}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </ProtectedLayout>
    )
}
