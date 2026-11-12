import './navButton.css'

type NavButtonProps = {
    icon: string;
    alt?: string; 
};

export default function NavButton({icon, alt = "navIcon"}: NavButtonProps) {
   return (
    <>
    <button className="navigation-button" type="button">
        <img src={icon} alt={alt} />
    </button>
    </>
   )
}