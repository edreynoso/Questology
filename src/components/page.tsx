import Header from './header'
import Footer from './footer'
import './page.css'

type PageProps = {
    children: React.ReactNode
}

export default function Page({children}: PageProps) {
    return (
        <>
        <div className="page-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
        </>
    )
}