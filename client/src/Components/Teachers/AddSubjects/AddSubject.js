import React, { useEffect, useState } from 'react';
import NavigationBarTeacher from '../../Header/NavigationBarTeacher';
import './AddSubject.css';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Container, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const AddSubject = ({ match, history }) => {
    const [subjectName, setsubjectName] = useState("");
    const [description, setdescription] = useState("");
    const [file, setFile] = useState({});
    const [video, setVideo] = useState("");

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

    const uploadVideo = async (e) => {
        e.preventDefault()
        console.log("ondrop", file)
        const form = new FormData();
        form.append("video",file);
        await console.log(form)
        axios.post(`http://localhost:5000/teacher/uploadVideo/${match.params.id}`, form)
        .then((data) => {
            console.log(data.data);
            setVideo(data.data);
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const addSubjectHandler = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/teacher/addSubject/${match.params.id}`, { subjectName, description, video })
            .then((data) => {
                setsubjectName("")
                setdescription("")
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
                        <Button type="submit" variant="warning" color="primary">Add</Button>
                    </form>
                    <div className="login__form__group">
                        <form onSubmit={uploadVideo}>
                            <input type="file" name="video" onChange={(e) => { setFile(e.target.files[0]) }} />
                            <button>Upload</button>
                        </form>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default AddSubject