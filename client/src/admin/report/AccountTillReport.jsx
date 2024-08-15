import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useReportStore from './useReportStore'
import { bc } from '../../helpers/bc'
import Filter from '../components/Filter'
import Pagination from 'react-js-pagination'
import { vr } from '../../helpers/vr'
import { validateForm } from './reportValidation'
import ReportHeader from './comp/ReportHeader'

export default function () {

    const { items, index, store, perPage, total } = useReportStore()
    const [formValues, setFormValues] = useState({
        page: 1,
        period: 'till',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        index(bc.skipNullData(formValues))
    }, [formValues])

    const handleEvaluate = (report) => {
        store({ account: report.reportable._id })
        index(bc.skipNullData(formValues))
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }))
    }

    const onChangeForm = (e) => {
        const validated = vr.validate(e, validateForm, formValues)
        setFormValues(prev => ({ ...prev, ...validated.formValues }))
        setErrors(prev => ({ ...prev, ...validated.error }))
    }

    return (
        <ProtectedLayout roles="admin">
            <ReportHeader
                heading="Account Till Report"
                filterType="account_till_report"
                formValues={formValues}
                errors={errors}
                onChangeForm={onChangeForm}
            />

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Account</th>
                                    <th>Amount</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.reportable.name}</td>
                                            <td>{item.price}</td>
                                            <td>{bc.displayDate(item.updatedAt)}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleEvaluate} item={item} icon="flask" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                    <Pagination
                        activePage={formValues.page}
                        itemsCountPerPage={perPage}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={handlePagination}
                    />

                </div>
            </div>

        </ProtectedLayout>


    )
}