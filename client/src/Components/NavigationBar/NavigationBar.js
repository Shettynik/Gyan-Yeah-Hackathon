import React,{useState, useEffect} from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';


const NavigationBar = ({auth, type, setauth, settype}) => {

    const logoutHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
            setauth(false)
            settype("")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <> 
        {/* <h1>{auth} {type}</h1>  */}
        {!auth ? (<Navbar style={{ backgroundColor: "#FFD523" }}>
        <Container>
            <Navbar.Brand>Gyan</Navbar.Brand>
        </Container>
    </Navbar>) : (type==='Teacher' ? (<Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                    <Nav className="mf-auto">
                        <Nav.Link><Link to={`/addSubject`} className="nav__links">Add Subjects</Link></Nav.Link>
                        <Nav.Link><Link to="/teacher/profile" className="nav__links"><AccountCircleIcon /></Link></Nav.Link>
                        <Nav.Link><Button onClick={(e) => { logoutHandler(e) }} >Logout</Button></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>): (<Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                    <Nav className="mf-auto">
                        <Nav.Link><Link to='/channels' className="nav__links">Channels</Link></Nav.Link>
                        <Nav.Link><Link to="/student/profile" className="nav__links"><AccountCircleIcon /></Link></Nav.Link>
                        <Nav.Link><Button onClick={(e) => { logoutHandler(e) }} >Logout</Button></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>)) }            
        </>
    )
}

export default NavigationBar
