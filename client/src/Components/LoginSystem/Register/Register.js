import React, {useState, useEffect} from 'react'
import { TextField } from '@material-ui/core';
import { Container, Navbar, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

const Register = ({history, match}) => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");

    const registerSubmit = async (e) => {
        
        e.preventDefault()
        axios.post(`http://localhost:5000/auth/register/Teacher${match.params.userType}`, {firstname, lastname, email, password},{ withCredentials: true },{
            'Content-Type': 'application/json',
        }).then((data) => {
            console.log(data)
            setfirstname("");
            setlastname("");
            setemail("");
            setpassword("");
        }).catch((error) => {
            if(password.length < 6){
                setError("Password must contain minimum 6 character")
            }else{
                setError("Email Id already taken");
            }
            
            setTimeout(() => {
                setError("")
            },5000)
        })
    }

    // useEffect(() => {
    //     axios.get("http://localhost:5000/auth/getLoggedIn").then((data) => {
    //         if (data.data.userType==="Teacher") {
    //             history.push(`/teacher/profile`)
    //         }else if(data.data.userType==="Student"){
    //             history.push(`/student/profile`)
    //         }
    //     }).catch((error) => {
    //         console.log(error.message)
    //     })
    // })

    return (
        <>
            {/* <Navbar style={{ backgroundColor: "#FFD523" }}>
                <Container>
                    <Navbar.Brand style={{ color: "darkblue", fontFamily: "700" }}>Gyan</Navbar.Brand>
                </Container>
            </Navbar> */}
            {error && (<Alert variant="danger">
                {error}
            </Alert>)}
            <Container className="register__container">
                <Container className="register__form__container">
                    <h2 className="register__form__header">Register as {match.params.userType}</h2>
                    <form onSubmit={registerSubmit} className="register__form">
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="First Name" type="text" value={firstname} onChange={(e) => {setfirstname(e.target.value)}} required />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Last Name" type="text" value={lastname} onChange={(e) =>{setlastname(e.target.value)}} required />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Email" type="email" value={email} onChange={(e) => {setemail(e.target.value)}} required  />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Password" type="password" value={password} onChange={(e) => {setpassword(e.target.value)}} required  />
                        </div>
                        <Button type="submit" variant="warning" color="primary">Register</Button>
                    </form>
                    <p className="login__form__register__link">Already have an account? <Link to="/login"></Link> </p>
                </Container>
            </Container>

        </>
    )
}

export default Register
