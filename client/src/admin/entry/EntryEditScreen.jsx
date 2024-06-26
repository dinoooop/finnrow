import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validateForm } from './entryValidation';
import { vr } from '../../helpers/vr';
import ProtectedLayout from '../layouts/ProtectedLayout';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRef } from 'react';
import useEntryStore from './useEntryStore';
import processData from '../../helpers/processData';
import InputField from '../../formc/InputField';
import SingleSelectAuto from '../../formc/SingleSelectAuto';
import Submit from '../../formc/Submit';
import { bc } from '../../helpers/bc';

export default function () {

    const navigate = useNavigate()
    const params = useParams()

    const { show, item, update, error } = useEntryStore()
    const [formValues, setFormValues] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        show(params.id)
    }, [params.id])

    useEffect(() => {
        setFormValues({
            _id: item._id,
            date: bc.getDate(item.date),
            account: item.account,
            note: item.note,
            price: item.price,
        })
        setFormValues(prev => ({ ...prev, logo_url: item.logo, photos_urls: item.photos }))
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
                navigate('/admin/entries')
            } catch (error) {
                console.error(error)
            }
        }
    }


    return (

        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Edit Entry</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="date" type="today" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="price" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <InputField name="note" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <SingleSelectAuto name="account" endpoint="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Submit cto="/admin/entries" />

                    </form>
                </div>
            </div>
        </ProtectedLayout>

    )
}
