import AppIcon from '../components/AppIcon';
import { useEffect, useState } from 'react';
import SortArrow from '../components/SortArrow';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import useUserStore from './useUserStore';
import StatusIcon from '../components/StatusIcon';

export default function () {

    const { items, perPage, total, index, remove, destroy, update, error } = useUserStore();
    const [formValues, setFormValues] = useState({ search: "", so: "", sb: "", page: 1 });

    useEffect(() => {
        const data = Object.fromEntries(
            Object.entries(formValues)
                .filter(([key, value]) => value !== "")
                .map(([key, value]) => [key, value])
        );
        index(data);

    }, [index, formValues]);

    const handleDelete = (user) => {
        remove(user);
        destroy(user);
    }

    const handleStatus = (id, status) => {
        const data = { _id: id, status };
        update(data);
        index();
    }

    const handleSearch = e => {
        setFormValues({ search: e.target.value });
    }

    const handleSort = (order, name) => {
        setFormValues(prev => ({ ...prev, so: order, sb: name }));
    }

    const handlePagination = number => {
        setFormValues(prev => ({ ...prev, page: number }));
    }

    return (
        <ProtectedLayout roles="admin">
            <div className="page-header">
                <h1>Users</h1>
                <div className="other-actions">
                    <AppIcon to="create" icon="add" />
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

                        {error && <p className='red-alert'>{error}</p>}

                        <table className="index-table">
                            <thead>
                                <tr>
                                    <th>Name <SortArrow onClick={handleSort} column="title" /></th>
                                    <th>Email <SortArrow onClick={handleSort} column="email" /></th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item) => (
                                        <tr key={item.id}>
                                            <td><Link to={`/admin/users/${item.id}`}>{item.name}</Link></td>
                                            <td>{item.email}</td>
                                            <td className='action'>
                                                <AppIcon onClick={handleDelete} item={item} icon="trash" />
                                                <AppIcon to={`/admin/users/${item._id}`} icon="edit" />
                                                <StatusIcon onClick={handleStatus} item={item} />
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