import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import { Container, Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';

const StudentProfile = ({ history, match }) => {

    const logoutHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
            history.push("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/auth/getLoggedIn").then((data) => {
            console.log(data.data.user)
            console.log(data.data.userType)
            if (!data.data.user) {
                history.push("/login")
            }
        }).catch((error) => {
            console.log(error.message)
        })
    })
    return (
        <>
            <Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="m-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                    style={{marginRight: "5px"}}
                                />
                                <Button variant="outline-primary">Search</Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <Nav.Link><Link to="/login" className="nav__links"><AccountCircleIcon /></Link></Nav.Link>
                            <Nav.Link><Button onClick={(e) => { logoutHandler(e) }} >Logout</Button></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <h6 className="student__profile__subscribe__header">You have not subcribed to any content yet!!</h6>
            </Container>
        </>
    )
}

export default StudentProfile;
