import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import SortArrow from '../components/SortArrow'
import Pagination from "react-js-pagination"
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import StatusIcon from '../components/StatusIcon'
import useEntryStore from './useEntryStore'
import { bc } from '../../helpers/bc'
import InputField from '../../formc/InputField'
import Select from '../../formc/Select'
import { vr } from '../../helpers/vr'
import { validateForm } from './entryValidation';


export default function () {

    const { items, index, remove, destroy, perPage, total } = useEntryStore()
    const [formValues, setFormValues] = useState({
        search: "",
        so: "",
        sb: "",
        page: 1,
        year: bc.getYear(),
        month: bc.getMonth()
    })

    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data)

    }, [formValues])


    const handleDelete = (entry) => {
        remove(entry)
        destroy(entry)
    }

    const handleSearch = e => {
        setFormValues({ search: e.target.value })
    }

    const handleSort = (order, name) => {
        setFormValues(prev => ({ ...prev, so: order, sb: name }))
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
            <div className="page-header">
                <h1>Entries</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                    <AppIcon icon="filter" onClick={() => setShowModal(true)} />
                    <div className="search">
                        <input type="text"
                            className="form-control input-field"
                            id="search"
                            value={formValues.search}
                            name="search"
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Date <SortArrow onClick={handleSort} column="date" /></th>
                                    <th>Account</th>
                                    <th>Note</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td><Link to={`/admin/entries/${item._id}`}>{bc.displayDate(item.date)}</Link></td>
                                            <td>{item.account.name}</td>
                                            <td>{item.note}</td>
                                            <td>{item.price}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/entries/${item._id}`} icon="edit" />
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

            {
                showModal &&
                <div className="modal">
                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>

                    <div className="modal-content">

                        <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Select name="month" optionType="months" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                        <Select name="account" optionType="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />

                        <button
                            type="button"
                            className="btn"
                            onClick={() => setShowModal(false)}
                        >Filter</button>
                    </div>
                </div>
            }

        </ProtectedLayout>


    )
}