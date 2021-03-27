import Image from 'next/image'
import Link from 'next/link'
import LinkContainer from 'react-router-bootstrap'
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
                <Link href="/"><Navbar.Brand as="a" href="/">The Den</Navbar.Brand></Link>
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link href="/logs">Logs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/clips">Clips</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/docs">Docs</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header