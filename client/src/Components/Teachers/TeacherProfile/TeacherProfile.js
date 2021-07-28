import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import './TeacherProfile.css';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axiosInstance from '../../../AxiosSetup';
import CircularProgress from '@material-ui/core/CircularProgress';
import Profile from './Profile/Profile';

const TeacherProfile = ({ history, match }) => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [subjects, setsubjects] = useState([]);

    // const logoutHandler = (e) => {
    //     e.preventDefault()
    //     axios.post("http://localhost:5000/auth/logout", { withCredentials: true }).then(() => {
    //         history.push("/login")
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    const getTeacherInfo = async (id) => {
        axiosInstance.get(`teacher/profile`, { withCredentials: true }).then((data) => {
            setfirstname(data.data.firstname);
            setlastname(data.data.lastname);
            setsubjects(data.data.subjectsCreated);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getTeacherInfo()
    })
    return (
        <>
            <div className="teacher__profile">
                <Profile firstname={firstname} lastname={lastname} subjects={subjects}/>
            </div>
        </>
    )
}

export default TeacherProfile
