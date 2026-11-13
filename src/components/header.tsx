import './header.css'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import NavButton from './navButton'

export default function Header() {
    return (
        <section id="header">
            <div className="Back">
                <NavButton icon={FaArrowLeft} label="Back" action="back"/>
            </div>
            <div className="Title">
                <h1>Questology</h1>
            </div>
            <div className="ProfileIcon">
                <NavButton
                    icon={FaUser}
                    label="Profile"
                    action="toast"
                    message="Profile settings are not implemented!"/>
            </div>
        </section>
    )
}
