import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './qnoteValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { useRef } from 'react';
import useQnoteStore from './useQnoteStore';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';
import SingleSelectAuto from '../../formc/SingleSelectAuto';

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const params = useParams()

    const { show, item, update, error } = useQnoteStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            _id: item._id,
            note: item.note,
            account: item.account,
        })
    }, [item])

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
                const resultAction = await update(newFormData)
                navigate('/admin/qnotes')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Qnote</h1>
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
