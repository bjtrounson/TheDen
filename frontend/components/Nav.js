import Image from 'next/image'
import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => { 
    return (
        <>
            <style>
                {`
                    .navbar-brand {
                        font-family: "Bungee", cursive;
                        color: #42b983;
                        padding-left: 0.5em;
                    }

                    .bg-dark {
                        background-color: #424242 !important;
                    }

                    .navbar-dark {
                        background-color: #424242 !important;
                    }
                `}
            </style>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
                <Image
                    src="/DENNIES.png"
                    alt="logo"
                    width="32"
                    height="32"
                />
                <Link href="/"><Navbar.Brand as="a" href="/"><a>The Den</a></Navbar.Brand></Link>
                <Nav className="mr-auto">
                    <Link href="/logs"><Nav.Link as="a" href="/logs"><a>Logs</a></Nav.Link></Link><br/>
                    <Link href="/clips"><Nav.Link as="a" href="/clips"><a>Clips</a></Nav.Link></Link><br/>
                    <Link href="/docs"><Nav.Link as="a" href="/docs"><a>Docs</a></Nav.Link></Link><br/>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header