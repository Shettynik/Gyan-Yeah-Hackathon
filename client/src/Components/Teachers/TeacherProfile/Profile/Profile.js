import React from 'react';
import { Container, Navbar, Button, Nav } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../TeacherProfile.css";

const Profile = ({ firstname, lastname, subjects, id }) => {
    const deleteSubject = async (subjectId) => {
        console.log(subjectId)
        axios.delete(`http://localhost:5000/teacher/deleteSubject/${id}/${subjectId}`).then(() => {
            console.log("subject deleted")
        }).catch((error) => {
            console.log(error.message)
        })
    }
    return (
        <>
            <Container className="teacher__profile__container">
                <div className="teacher__profile__image">
                    <input accept="image/*" style={{ display: "none" }} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <div className="teacher__profile__header">
                    <h5 className="teacher__profile__name">{firstname} {lastname}</h5>
                    <p className="teacher__profile__bio">when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                </div>
            </Container>
            <Container className="teacher__profile__subject__container">
                <h6 className="teacher__profile__subject__header">Subjects</h6>
                <div className="teacher__profile__subjects">
                    {subjects && subjects.map((subject) => (
                        <div className="teacher__profile__subject">
                            <video width="320" height="240" className="tab" controls>Your browser does not support the &lt;video&gt; tag.
                                <source src="https://gyandb.s3.amazonaws.com/2021-07-21T16268673958071242623357.mp4" />
                            </video>
                            <p className="teacher__profile__subject__name">{subject.subjectName}</p>
                            <p className="teacher__profile__subject__name">{subject.description}</p>
                            {/* <Button className="teacher__profile__subject__btn" >Add Contents</Button> */}
                            <Button className="teacher__profile__subject__btn" variant="danger" onClick={() => {deleteSubject(subject._id)}}>Delete</Button>
                        </div>)
                    )}
                </div>
            </Container>
        </>
    )
}

export default Profile
