import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './userValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { bc } from '../../helpers/bc';
import { sv } from '../../helpers/sv';
import useUserStore from './useUserStore';
import InputField from '../../formc/InputField';
import Radio from '../../formc/Radio';
import Submit from '../../formc/Submit';

export default function () {

    const navigate = useNavigate()
    const params = useParams()

    const { error, update, reset, show, item } = useUserStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        reset()
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            id: item._id,
            name: item.name,
            email: item.email,
            password: '',
            role: item.role,
            status: item.status,
        })
    }, [item])

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                await update(newFormData)
                const { error, loading } = useUserStore.getState()
                if (!error && !loading) {
                    navigate('/admin/users')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}
                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="password" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Radio name="role" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Radio name="status" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/users" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
