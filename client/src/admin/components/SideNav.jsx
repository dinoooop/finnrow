import SideNavButton from './SideNavButton';

export default function () {

    return (
        <div className="nav" >
            <ul className="sidenav">
                <SideNavButton title="Entries" icon="fa-solid fa-file-import" href="/admin/entries" />
                <SideNavButton title="Accounts" icon="fa-solid fa-file-invoice" href="/admin/accounts" />
                <SideNavButton title="Categories" icon="fa-solid fa-table-cells-large" href="/admin/categories" />
                <SideNavButton title="Qnotes" icon="fa-solid fa-gauge-high" href="/admin/qnotes" />
                <SideNavButton title="Reports" icon="fa-solid fa-flag" href="/admin/account-month-report" />
                <SideNavButton title="Users" icon="fa-solid fa-user" href="/admin/users" />
            </ul>
        </div >
    );
}