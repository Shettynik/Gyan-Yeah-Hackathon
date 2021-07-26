import React, { useState, useEffect } from 'react';
import './StudentProfile.css';
import { Container, Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentProfile = ({ history, match }) => {

    return (
        <>
            {/* <Navbar style={{ backgroundColor: "#FFD523" }}>
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
            </Navbar> */}
            <Container>
                <h6 className="student__profile__subscribe__header">You have not subcribed to any content yet!!</h6>
            </Container>
        </>
    )
}

export default StudentProfile;
