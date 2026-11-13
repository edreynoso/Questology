import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import './notFound.css'

export const NOT_FOUND_PATH = '/404'

export default function NotFound() {
    const { pathname } = useLocation()
    const isUnknownRoute = pathname !== NOT_FOUND_PATH

    useEffect(() => {
        if (!isUnknownRoute) return
        // toastId dedupes the StrictMode double-run
        toast.error(`The page "${pathname}" does not exist.`, { toastId: `404:${pathname}` })
    }, [isUnknownRoute, pathname])

    // Rendered by the catch-all route: redirect to the universal 404 page.
    if (isUnknownRoute) {
        return <Navigate to={NOT_FOUND_PATH} replace />
    }

    return (
        <main className="NotFoundPage">
            <h1>404</h1>
            <p>This page does not exist.</p>
            <Link to="/">Back to home</Link>
        </main>
    )
}
