import { useEffect } from 'react'
import DashboardLayout from './DashboardLayout'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../auth/useAuthStore'
import useStStore from '../../bootstrap/st/useStStore'

export default function ProtectedLayout({ roles, children, error = false }) {

    const { user, check } = useAuthStore()
    const { stData, getStock } = useStStore();

    const navigate = useNavigate()

    useEffect(() => {
        check()

        if (!stData) {
            getStock()
        }

        if (!user) {
            navigate('/login')
        }
    }, [user])


    return (
        <>
            {
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            }
        </>
    )
}
