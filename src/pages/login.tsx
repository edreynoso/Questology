import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, logIn } from '../utils/auth'

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/communities'

    if (isLoggedIn()) {
        return <Navigate to={from} replace />
    }

    function handleLogin() {
        logIn()
        navigate(from, { replace: true })
    }

    return (
        <main className="LoginPage">
            <h1>Questology</h1>
            <button type="button" onClick={handleLogin}>Log in</button>
        </main>
    )
}
