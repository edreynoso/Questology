import './footer.css'
import { FaMap, FaRegCompass, FaUser, FaUsers } from 'react-icons/fa'
import NavButton from './navButton'

export default function Footer() {
    return (
        <section id="footer">
            <NavButton
                icon={FaUsers}
                label="Communities"
                action="navigate"
                to="/communities"/>
            <NavButton
                icon={FaRegCompass}
                label="Discover"
                action="unavailable"
                message="Discovery is not currently implemented!"/>
            <NavButton
                icon={FaMap}
                label="Quests"
                action="unavailable"
                message="Your Quests page is currently under maintenance!"/>
            <NavButton
                icon={FaUser}
                label="Profile"
                action="unavailable"
                message="Profile settings are not implemented!"/>
        </section>
    )
}
