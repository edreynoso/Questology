import { useEffect } from 'react'
import { FaRegCompass } from 'react-icons/fa'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import './notFound.css'

export const NOT_FOUND_PATH = '/404'

export default function NotFound() {
    const { pathname, state } = useLocation()
    // Set when an unbuilt feature's button sends the user here
    const feature = (state as { feature?: string } | null)?.feature
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
            <FaRegCompass className="NotFoundIcon" aria-hidden="true" />
            <h2 className="page-title">
                {feature ? 'Coming soon' : 'Lost the trail'}
            </h2>
            <p>
                {feature
                    ? `${feature} isn't available yet. Check back later!`
                    : "We couldn't find the page you were looking for."}
            </p>
            <span className="NotFoundCode">Error 404</span>
            <Link to="/communities" className="NotFoundButton">Back to Communities</Link>
        </main>
    )
}
