import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useQnoteStore from './useQnoteStore'

export default function () {

    const { index, remove, destroy, items } = useQnoteStore()

    useEffect(() => {
        index()
    }, [])

    const handleDelete = (qnote) => {
        remove(qnote)
        destroy(qnote)
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Qnotes</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
                </div>
            </div>

            <div className="row">
                <div className='cardbody'>
                    <div className="index-table-container">

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Account</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td><Link to={`/admin/qnotes/${item._id}`}>{item.note}</Link></td>
                                            <td>{item.account.name}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/qnotes/${item._id}`} icon="edit" />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>

        </ProtectedLayout>


    )
}