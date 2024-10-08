import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './reportValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { useRef } from 'react';
import useReportStore from './useReportStore';
import InputField from '../../formc/InputField';
import Submit from '../../formc/Submit';

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const params = useParams()

    const { show, item, update, error } = useReportStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            _id: item._id,
            name: item.name,
            description: item.description,
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
                navigate('/admin/reports')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Report</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="description" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/reports" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
