import type { IconType } from 'react-icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './navButton.css'

type NavButtonProps = {
    icon: IconType;
    label: string;
} & (
    | { action: 'navigate'; to: string }
    | { action: 'toast'; message: string }
    | { action: 'back' }
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

    const handleClick = props.action === 'back'
        ? () => navigate(-1)
        : () => toast.info(props.message)

    return (
        <button type="button" className="NavButton" aria-label={label} title={label} onClick={handleClick}>
            {content}
        </button>
    )
}
