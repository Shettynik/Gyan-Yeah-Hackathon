import React, { useEffect, useState } from 'react';
import NavigationBarTeacher from '../../Header/NavigationBarTeacher';
import './AddSubject.css';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Container, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const AddSubject = ({ match, history }) => {
    const [subjectName, setsubjectName] = useState("");
    const [description, setdescription] = useState("");
    const [video, setvideo] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/auth/getLoggedIn").then((data) => {
            console.log(data.data.user)
            if (!data.data.user) {
                history.push("/login")
            }
        }).catch((error) => {
            console.log(error.message)
        })
    });

    const addSubjectHandler = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/teacher/addSubject/60f65c0babc9d32384ef166d`, {subjectName, description, video})
        .then((data) => {
            setsubjectName("")
            setdescription("")
            setvideo("")
            history.push(`/teacher/profile/${match.params.id}`)
        }).catch((error) => {
            console.log(error.message)
        })
    }
    return (
        <>
            <NavigationBarTeacher id={match.params.id} history={history} />
            <Container className="register__container">
                <Container className="register__form__container">
                    <h2 className="register__form__header">Add Subject</h2>
                    <form onSubmit={addSubjectHandler} className="register__form">
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Subject Name" type="text" value={subjectName} onChange={(e) => { setsubjectName(e.target.value) }} required />
                        </div>
                        <div className="login__form__group">
                            <TextField
                                id="standard-textarea"
                                label="Subject Description"
                                multiline
                                value={description} onChange={(e) => { setdescription(e.target.value) }} />
                        </div>
                        <div className="login__form__group">
                            <TextField id="standard-basic" label="Video Link" type="text" value={video} onChange={(e) => { setvideo(e.target.value) }} required />
                        </div>
                        <Button type="submit" variant="warning" color="primary">Add</Button>
                    </form>
                </Container>
            </Container>
        </>
    )
}

export default AddSubject