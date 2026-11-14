import { useState, type FormEvent } from 'react'
import { FaRegCompass } from 'react-icons/fa'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isLoggedIn, logIn } from '../utils/auth'
import './login.css'

type Mode = 'login' | 'signup'

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/communities'
    const [mode, setMode] = useState<Mode>('login')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if (isLoggedIn()) {
        return <Navigate to={from} replace />
    }

    const isSignup = mode === 'signup'

    function switchMode() {
        setMode(isSignup ? 'login' : 'signup')
        setPassword('')
        setConfirmPassword('')
    }

    // Mock auth: nothing is checked or saved, any filled-in form logs you in
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (isSignup && password !== confirmPassword) {
            toast.error('Passwords do not match.')
            return
        }

        logIn()
        toast.success(isSignup ? 'Welcome to Questology!' : 'Welcome back!')
        navigate(from, { replace: true })
    }

    return (
        <main className="LoginPage">
            <div className="LoginBrand">
                <FaRegCompass aria-hidden="true" />
                <h1>Questology</h1>
                <p>Find your community. Start a quest.</p>
            </div>

            <form className="LoginCard" onSubmit={handleSubmit}>
                <h2 className="page-title">{isSignup ? 'Create account' : 'Log in'}</h2>

                {isSignup && (
                    <label>
                        Name
                        <input type="text" name="name" autoComplete="name" required />
                    </label>
                )}

                <label>
                    Email
                    <input type="email" name="email" autoComplete="email" required />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                        minLength={isSignup ? 8 : undefined}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>

                {isSignup && (
                    <label>
                        Confirm password
                        <input
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </label>
                )}

                <button type="submit" className="LoginSubmit">
                    {isSignup ? 'Sign up' : 'Log in'}
                </button>
            </form>

            <p className="LoginSwitch">
                {isSignup ? 'Already have an account?' : 'New to Questology?'}
                <button type="button" onClick={switchMode}>
                    {isSignup ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </main>
    )
}
