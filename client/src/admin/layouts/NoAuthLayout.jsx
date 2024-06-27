import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useGeneralStore from '../general/useGeneralStore';
import useAuthStore from '../auth/useAuthStore';

import useStStore from '../../bootstrap/st/useStStore';
import { st } from '../../bootstrap/st/st';

// Authenticated user not allowed to visit this page
export default function (props) {

    const { stData, getStock } = useStStore();
    const { user } = useAuthStore();
    const navigate = useNavigate()

    useEffect(() => {
        if (!stData) {
            getStock()
        }
        if (user) { navigate('/admin/modules') }
    }, [user])

    return (
        <div>
            <div className="container-blank">
                {props.children}
            </div>
        </div>
    );
}