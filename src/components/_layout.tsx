import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout () {
    return (
        <div className="AppLayout">
            <Header/>
            <div className="AppContent">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
