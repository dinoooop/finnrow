import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './entryValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useEntryStore from './useEntryStore'
import processData from '../../helpers/processData'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import TextArea from '../../formc/TextArea'
import Select from '../../formc/Select'
import SingleSelectAuto from '../../formc/SingleSelectAuto'
import { bc } from '../../helpers/bc'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    const { reset, store, error } = useEntryStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({})

    

    useEffect(() => {
        reset()
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
            </div>
        </ProtectedLayout>
    )
}
