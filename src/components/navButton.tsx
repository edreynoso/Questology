import './navButton.css'
import  {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

type NavButtonProps = {
    icon: string;
    alt?: string; 
} & (
    | { action: "toast"; message: string }
    | { action: "navigate"; to: string }
    | { action: "back"}
)

export default function NavButton(props: NavButtonProps) {
    const navigate = useNavigate();

  if (props.action === "navigate") {
    return (
    <>
    <Link className="navigation-button" to={props.to}>
        <img src={props.icon} alt={props.alt} />
    </Link>
    </>
   )
  }
  if (props.action === "back") {
    return (
    <>
    <button className="navigation-button" type="button"
      onClick={() => navigate(-1)}>
        <img src={props.icon} alt={props.alt} />
    </button>
    </>
    )
  }
  // Default to toast, only 3 supported
  return (
    <>
    <button className="navigation-button" type="button"
      onClick={() => toast.info(props.message)}>
        <img src={props.icon} alt={props.alt} />
    </button>
    </>
   )
}