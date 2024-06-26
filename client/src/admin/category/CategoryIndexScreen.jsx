import AppIcon from '../components/AppIcon'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedLayout from '../layouts/ProtectedLayout'
import useCategoryStore from './useCategoryStore'

export default function () {

    const { index, remove, destroy, items } = useCategoryStore()

    useEffect(() => {
        index()
    }, [])

    const handleDelete = (category) => {
        remove(category)
        destroy(category)
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Categories</h1>
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
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    items.map((item) => (
                                        <tr key={item._id}>
                                            <td><Link to={`/admin/categories/${item._id}`}>{item.name}</Link></td>
                                            <td>{item.description}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/categories/${item._id}`} icon="edit" />
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