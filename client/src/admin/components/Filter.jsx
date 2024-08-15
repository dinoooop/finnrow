import { Link } from "react-router-dom";
import InputField from "../../formc/InputField";
import Select from "../../formc/Select";
import { useState } from "react";

export default function ({ formValues, errors, onChangeForm, filterType }) {

    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <div className="tooltip">
                <i className="fas fa-filter icon" onClick={() => setShowModal(true)} ></i>
            </div>

            {
                showModal &&
                <div className="modal">
                    <div className="modal-close-screen" onClick={() => setShowModal(false)}></div>

                    <div className="modal-content">

                        {
                            filterType === "entries" &&
                            <>
                                <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <Select name="month" optionType="months" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <Select name="account" optionType="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </>
                        }

                        {
                            filterType === "account_year_report" &&
                            <>
                                <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <Select name="account" optionType="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </>
                        }

                        {
                            filterType === "account_month_report" &&
                            <>
                                <InputField name="year" type="number" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <Select name="month" optionType="months" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                                <Select name="account" optionType="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </>
                        }
                        {
                            filterType === "account_till_report" &&
                            <>
                                <Select name="account" optionType="accounts" formValues={formValues} errors={errors} onChangeForm={onChangeForm} />
                            </>
                        }


                        <button
                            type="button"
                            className="btn"
                            onClick={() => setShowModal(false)}
                        >Filter</button>
                    </div>
                </div>
            }
        </>
    );
}