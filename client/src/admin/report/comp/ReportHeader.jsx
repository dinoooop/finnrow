import AppIcon from "../../components/AppIcon";
import Filter from "../../components/Filter";

export default function ({ heading, filterType, formValues, errors, onChangeForm }) {
    return (
        <div className="page-header">
            <h1>{heading}</h1>
            <div className="other-actions">
                <AppIcon to="/admin/reports/create" icon="add" />
                <Filter
                    filterType={filterType}
                    formValues={formValues}
                    errors={errors}
                    onChangeForm={onChangeForm}
                />
                <AppIcon to="/admin/account-year-report" icon="calendar" />
                <AppIcon to="/admin/account-month-report" icon="calendar-days" />
                <AppIcon to="/admin/account-till-report" icon="snowflake" />
            </div>
        </div>
    )
}