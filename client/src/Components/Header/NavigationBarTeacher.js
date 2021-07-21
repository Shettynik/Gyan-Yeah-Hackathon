import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NavigationBarTeacher = ({history, id}) => {
    const logoutHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/auth/logout", {withCredentials: true}).then(() => {
            history.push("/login")
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                    <Nav className="mf-auto">
                        <Nav.Link><Link to={`/addSubject/${id}`}  className="nav__links">Add Subjects</Link></Nav.Link>
                        <Nav.Link><Link to="/login" className="nav__links"><AccountCircleIcon /></Link></Nav.Link>
                        <Nav.Link><Button onClick={(e) => {logoutHandler(e)}} >Logout</Button></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    )
}

export default NavigationBarTeacher
