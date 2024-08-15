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
        period: 'month',
        year: bc.getYear(),
        month: bc.getMonth()
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        index(bc.skipNullData(formValues))

    }, [formValues])

    const handleEvaluate = async (report) => {
        await store({
            year: bc.getYear(report.date),
            month: bc.getMonth(report.date),
            account: report.reportable._id,
        })

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
                heading="Account Month Report"
                filterType="account_month_report"
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
                                    <th>Year</th>
                                    <th>Month</th>
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
                                            <td><Link to={`/admin/reports/${item._id}`}>{bc.getYear(item.date)}</Link></td>
                                            <td>{bc.displayDate(item.date, 'month')}</td>
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