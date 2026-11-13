import './header.css'
import NavButton from './navButton'
import backArrow from "../assets/backArrow.png"
import profileImage from "../assets/profileImageREPLACEME.svg"

export default function Header() {
    return (
        <>
        <section id="header">
            <NavButton
                icon={backArrow}
                alt="Arrow point left, or 'backwards'."
                action="back"/>
            <div className="Title">
                <h1>Questology</h1>
            </div>
            <NavButton
                icon={profileImage}
                alt="Small rounded user profile image."
                action="toast"
                message="Profile settings are not implemented!"/>
        </section>
        </>
    )
}