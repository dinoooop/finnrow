import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { validateForm } from './userValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import { unwrapResult } from '@reduxjs/toolkit'
import { bc } from '../../helpers/bc'
import { sv } from '../../helpers/sv'
import useUserStore from './useUserStore'
import InputField from '../../formc/InputField'
import InputFileMulti from '../../formc/InputFileMulti'
import InputFile from '../../formc/InputFile'
import Checkbox from '../../formc/Checkbox'
import Radio from '../../formc/Radio'
import Submit from '../../formc/Submit'
import MultiSelect from '../../formc/MultiSelect'
import MultiSelectAuto from '../../formc/MultiSelectAuto'

export default function () {

    const navigate = useNavigate()
    const fileInputRef = useRef()
    const { error, store, reset } = useUserStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        name: "test 2",
        email: "test@mail.com",
        roles: [sv.role("subscriber")],
        password: "welcome",
        status: sv.status("active"),
        avatar: '',
        photo: '',
        album: [],
        previews: [],
        country: [1, 2, 103]
    })

    useEffect(() => { reset() }, [reset])

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
                const resultAction = await store(newFormData)
                // unwrapResult(resultAction)
                navigate('/admin/users')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create User</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <MultiSelectAuto name="country" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFileMulti name="album" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputFile name="photo" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="name" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="email" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="password" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Checkbox name="role" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Radio name="status" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/users" />

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
