import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Container, Navbar, Button, Alert } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../AxiosSetup';

const Login = ({ history, match }) => {
    const [teacheremail, setteacherEmail] = useState("");
    const [teacherpassword, setteacherPassword] = useState("");
    const [studentemail, setstudentEmail] = useState("");
    const [studentpassword, setstudentPassword] = useState("");
    const [error, setError] = useState("");

    const studentLogin = async (e) => {
        e.preventDefault();
        axiosInstance.post("/auth/login/Student", { email: studentemail, password: studentpassword }, { withCredentials: true }, {
            'Content-Type': 'application/json',
        }).then(() => {
            history.push('/student/profile')
            setstudentEmail("");
            setstudentPassword("");
        }).catch((error) => { 
            console.log(error)
            setError(error.message);
            setTimeout(() => {
                setError("")
            },5000)
         })
    }

    const teacherLogin = async (e) => {
        e.preventDefault()
        axiosInstance.post("/auth/login/Teacher", { email: teacheremail, password: teacherpassword }, { withCredentials: true }, {
            'Content-Type': 'application/json',
        }).then(() => {
            history.push("/teacher/profile")
            setteacherEmail("");
            setteacherPassword("");
        }).catch((error) => {
            console.log(error)
            setError(error.message);
            setTimeout(() => {
                setError("")
            },5000)
        })
    }
    return (
        <>
            {error && (<Alert variant="danger">
                Please Check your email id and password
            </Alert>)}
            <Container className="login__main__container">
                <Container className="login__sub__container">
                    <h2 className="login__header">Login as Student</h2>
                    <form onSubmit={studentLogin}>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Email" type="email" required value={studentemail} onChange={(e) => { setstudentEmail(e.target.value) }} />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Password" type="password" required value={studentpassword} onChange={(e) => { setstudentPassword(e.target.value) }} />
                        </div>
                        <Button type="submit" variant="warning">Login</Button>
                    </form>
                    <p className="login__form__register__link">Don't have an account? <Link to={`/register/Student`}>Register</Link></p>
                </Container>
                <Container className="login__sub__container">
                    <h2 className="login__header">Login as Teacher</h2>
                    <form onSubmit={teacherLogin}>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Email" type="email" required value={teacheremail} onChange={(e) => { setteacherEmail(e.target.value) }} />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Password" type="password" required value={teacherpassword} onChange={(e) => { setteacherPassword(e.target.value) }} />
                        </div>
                        <Button type="submit" variant="warning">Login</Button>
                    </form>
                    <p className="login__form__register__link">Don't have an account? <Link to={`/register/Teacher`}>Register</Link></p>
                </Container>
            </Container>
        </>
    )
}

export default Login
