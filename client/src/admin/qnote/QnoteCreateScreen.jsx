import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateForm } from './qnoteValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useQnoteStore from './useQnoteStore'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import SingleSelectAuto from '../../formc/SingleSelectAuto'

export default function () {

    const navigate = useNavigate()
    const { reset, store, error } = useQnoteStore()
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
                navigate('/admin/qnotes')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Qnote</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="note" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <SingleSelectAuto name="account" endpoint="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/qnotes" />

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
