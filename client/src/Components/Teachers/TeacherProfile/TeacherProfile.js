import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import './TeacherProfile.css';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Profile from './Profile/Profile';

const TeacherProfile = ({ history, match }) => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [subjects, setsubjects] = useState([]);

    const logoutHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
            history.push("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTeacherInfo = async (id) => {
        axios.get(`http://localhost:5000/teacher/${match.params.id}`, { withCredentials: true }).then((data) => {
            setfirstname(data.data.firstname);
            setlastname(data.data.lastname);
            setsubjects(data.data.subjectsCreated);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/auth/getLoggedIn").then((data) => {
            console.log(data.data.user)
            if (data.data.user) {
                getTeacherInfo(data.data.user)
            }
            else if (!data.data.user) {
                history.push("/login")
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }, [])
    return (
        <>
            <Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                    <Nav className="mf-auto">
                        <Nav.Link><Link to={`/addSubject/${match.params.id}`} className="nav__links">Add Subjects</Link></Nav.Link>
                        <Nav.Link><Link to="/login" className="nav__links"><AccountCircleIcon /></Link></Nav.Link>
                        <Nav.Link><Button onClick={(e) => { logoutHandler(e) }} >Logout</Button></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="teacher__profile">
                {firstname==="" && lastname ==="" ? <Container style={{textAlign:"center", marginTop:"10%"}}>
                    <CircularProgress />
                </Container> : <Profile firstname={firstname} lastname={lastname} subjects={subjects} /> }
            </div>
        </>
    )
}

export default TeacherProfile
