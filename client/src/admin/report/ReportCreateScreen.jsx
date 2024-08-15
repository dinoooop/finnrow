import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateForm } from './reportValidation'
import { vr } from '../../helpers/vr'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useReportStore from './useReportStore'
import InputField from '../../formc/InputField'
import Submit from '../../formc/Submit'
import Select from '../../formc/Select'
import { st } from '../../bootstrap/st/st'
import { bc } from '../../helpers/bc'
import AppIcon from '../components/AppIcon'

export default function () {

    const navigate = useNavigate()
    const { reset, store, error } = useReportStore()
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({
        year: bc.getYear(),
        month: bc.getMonth(),
    })

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
        const { dataset } = e.target;
        const { customValue, customName } = dataset;
        formValues[customName] = customValue;        
        const newFormData = vr.submit(formValues, validateForm)
        if (typeof newFormData.errors != 'undefined') {
            setErrors(newFormData.errors)
        } else {
            try {
                const resultAction = await store(newFormData)
                // navigate('/admin/reports')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <ProtectedLayout roles="admin">

            <div className="page-header">
                <h1>Create Report</h1>
            </div>

            <div className="row">
                <div className='cardbody col-lg-6'>
                    <form onSubmit={handleSubmit}>

                        {error && <p className='red-alert'>{error}</p>}

                        <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Select name="month" optionType="months" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <table className='index-table'>
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    st.accounts().map(account => (
                                        <tr key={account._id}>
                                            <td>{account.name}</td>
                                            <td>


                                                <div className="tooltip">
                                                    <i
                                                        data-custom-field="icon-select"
                                                        data-custom-name="account"
                                                        data-custom-value={account._id}
                                                        className={"fas fa-add icon"} onClick={handleSubmit}></i>
                                                </div>

                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </form>

                </div>
            </div>
        </ProtectedLayout>
    )
}
