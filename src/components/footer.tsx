import './footer.css'
import { FaMap, FaRegCompass, FaUsers } from 'react-icons/fa'
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
                action="toast"
                message="Discovery is not currently implemented!"/>
            <NavButton
                icon={FaMap}
                label="Quests"
                action="toast"
                message="Your Quests page is currently under maintenance!"/>
        </section>
    )
}
