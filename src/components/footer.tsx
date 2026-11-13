import './footer.css'
import NavButton from './navButton'
import communitiesIcon from "../assets/communitiesIcon.png"
import discoveryIcon from "../assets/discoveryIcon.svg"
import questsIcon from "../assets/questsIcon.png"

export default function Footer() {
    return (
        <>
        <section id="footer">
            <NavButton
              icon={communitiesIcon}
              alt="Image of three silluettes"
              action="navigate"
              to="../pages/communities"/>
            <NavButton
              icon={discoveryIcon}
              alt="Icon of stylized compass"
              action="toast"
              message="Discovery is not currently implemented!"/>
            <NavButton
              icon={questsIcon}
              alt="Image of a scroll containing generic text."
              action="toast"
              message="Your Quests page is currently under maintenance!"/>
        </section>
        </>
    )
}