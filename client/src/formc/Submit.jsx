import { Link } from "react-router-dom";

export default function ({ label, cto }) {
    return (
        <>
            <button type='submit' className="btn submit">{label ?? "Submit"}</button>
            {cto && <Link to={cto} className="btn">Cancel</Link>}
        </>
    )
}