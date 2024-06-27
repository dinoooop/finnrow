import { useEffect, useState } from "react";
import { sv } from "../../helpers/sv";

export default function (props) {

    const { item } = props;
    const [status, setStatus] = useState(item.status)

    const handleOnClick = (cst) => {
        setStatus(cst);
        props.onClick(item._id, cst);
    }

    return (
        <>
            {
                status === 'active'
                    ?
                    <div className="tooltip">
                        <i className={"fas fa-square-check icon"} onClick={() => handleOnClick('suspended')}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
                    :
                    <div className="tooltip">
                        <i className={"fas fa-circle-xmark icon"} onClick={() => handleOnClick('active')}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
            }
        </>
    );
}