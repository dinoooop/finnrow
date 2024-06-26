import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { vr } from '../../helpers/vr'
import { validateForm } from './authValidation'
import NoAuthLayout from '../layouts/NoAuthLayout'
import useAuthStore from './useAuthStore'
import { pbc } from '../../helpers/pbc'

export default function () {

    const navigate = useNavigate()

    const [formValues, setFormValues] = useState(pbc.dummy('register'))
    const [errors, setErrors] = useState({})
    const { error, loading, register } = useAuthStore()

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
                const resultAction = await register(newFormData)
                navigate('/admin/sponsors')
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <NoAuthLayout>
            <div className='cardbody col-md-4 col-sm-8'>

                <h1>Sign Up</h1>
                <p className="my-1">Have an account? <Link to="/login">Log in now</Link></p>
                <p className="my-1">Go to <Link to="/">Home</Link></p>

                {
                    error &&
                    <p className='red-alert'>{error}</p>
                }
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Name</label>
                        <input type="text"
                            className="form-control input-field"
                            id="name"
                            value={formValues.name}
                            name="name"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            className="form-control input-field"
                            id="email"
                            value={formValues.email}
                            name="email"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.email}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control input-field"
                            id="password"
                            value={formValues.password}
                            name="password"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.password}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input type="password"
                            className="form-control input-field"
                            id="password_confirmation"
                            value={formValues.password_confirmation}
                            name="password_confirmation"
                            onChange={onChangeForm}
                        />
                        <div className="color-red">{errors.password_confirmation}</div>
                    </div>

                    {
                        loading
                            ? <div className='loader'></div>
                            : <button className="btnmid">SIGN UP</button>
                    }
                </form>
            </div>
        </NoAuthLayout>
    )
}
