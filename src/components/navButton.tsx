import type { IconType } from 'react-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NOT_FOUND_PATH } from '../pages/notFound'
import './navButton.css'

type NavButtonProps = {
    icon: IconType;
    label: string;
} & (
    | { action: 'navigate'; to: string }
    /** Feature without a page yet: shows a toast and goes to the 404 page */
    | { action: 'unavailable'; message: string }
)

export default function NavButton(props: NavButtonProps) {
    const navigate = useNavigate()
    const { icon: Icon, label } = props
    const content = <Icon aria-hidden="true" />

    if (props.action === 'navigate') {
        return (
            <NavLink to={props.to} className="NavButton" aria-label={label} title={label}>
                {content}
            </NavLink>
        )
    }

    function handleClick() {
        if (props.action !== 'unavailable') return
        toast.info(props.message, { toastId: `unavailable:${label}` })
        navigate(NOT_FOUND_PATH, { state: { feature: label } })
    }

    return (
        <button type="button" className="NavButton" aria-label={label} title={label} onClick={handleClick}>
            {content}
        </button>
    )
}
