import { useEffect, useState } from "react";
import { sv } from "../../helpers/sv";

export default function (props) {

    const { item } = props;
    const [status, setStatus] = useState(item.status)

    const handleOnClick = () => {
        setStatus(prevStatus => prevStatus === 'active' ? 'inactive' : 'active');
        props.onClick(item._id, status);
    }

    return (
        <>
            {
                status === sv.status("active")
                    ?
                    <div className="tooltip">
                        <i className={"fas fa-square-check icon"} onClick={handleOnClick}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
                    :
                    <div className="tooltip">
                        <i className={"fas fa-circle-xmark icon"} onClick={handleOnClick}></i>
                        <div className="top">Change status<i></i></div>
                    </div>
            }
        </>
    );
}