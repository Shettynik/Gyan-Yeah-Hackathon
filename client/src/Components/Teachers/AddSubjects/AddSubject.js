import React, { useEffect, useState } from 'react';
import NavigationBarTeacher from '../../Header/NavigationBarTeacher';
import './AddSubject.css';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const AddSubject = ({ match, history }) => {
    const [subjectName, setsubjectName] = useState("");
    const [description, setdescription] = useState("");
    const [file, setFile] = useState({});
    const [video, setVideo] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [message, setmessage] = useState("");

    const uploadVideo = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log("ondrop", file)
        const form = new FormData();
        form.append("video", file);
        axios.post(`http://localhost:5000/teacher/uploadVideo`, form)
            .then((data) => {
                console.log(data.data);
                setVideo(data.data);
                setloading(false);
                setmessage("Video uploaded successfully !");
                setTimeout(() => {
                    setmessage("")
                }, 7000)
            })
            .catch((error) => {
                seterror(error.message)
                setTimeout(() => {
                    seterror("")
                }, 7000)
            })
    }

    const addSubjectHandler = async (e) => {
        e.preventDefault();
        console.log(subjectName, description, video)
        axios.post(`http://localhost:5000/teacher/addSubject`, { subjectName, description, video })
            .then((data) => {
                setsubjectName("")
                setdescription("")
                history.push(`/teacher/profile`)
            }).catch((error) => {
                seterror(error.message)
                setTimeout(() => {
                    seterror("")
                }, 7000)
            })
    }
    return (
        <>
            {loading && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
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