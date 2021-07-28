import React, { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../../AxiosSetup';

const Channels = () => {
    const [channels, setchannels] = useState([]);
    const [error, seterror] = useState("");
    const [message, setmessage] = useState("");

    const getChannels = () => {
        axiosInstance.get('/channels').then((data) => {
            console.log(data.data)
            setchannels(data.data)
            seterror("")
        }).catch((error) => {
            seterror("Something went wrong!")
            console.log(error.message)
        })
    }

    const followHandler = (id) => {
        axiosInstance.post(`/channels/follow/${id}`)
        .then(() => {
            setmessage("Successfully followed");
            setTimeout(() => {
                setmessage("")
            },7000)
        })
        .catch((error) => {
            seterror("Something went wrong! Please try again");
            setTimeout(() => {
                seterror("")
            },7000)
        })
    }

    useEffect(() => {
        getChannels()
    },[])
    return (
        <>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <p>{error}</p>}
        { channels && channels.map((channel) => (
            <Container>
                <p>{channel.firstname} {channel.lastname}</p>
                <p>Subjects Created: {channel.subjectsCreated.length}</p>
                <p>Students: {channel.students.length}</p>
                <Button className="m-1 ml-0">View</Button>
                <Button onClick={() => {followHandler(channel._id)}}>Follow</Button>
            </Container>
        ))}
    </>
        
    )
}

export default Channels
