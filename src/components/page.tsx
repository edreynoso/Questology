import Header from './header'
import Footer from './footer'
import './page.css'

type PageProps = {
    body: React.ReactNode
}

export default function Page({body}: PageProps) {
    return (
        <>
        <div className="page-layout">
            <Header />
            <main>{body}</main>
            <Footer />
        </div>
        </>
    )
}