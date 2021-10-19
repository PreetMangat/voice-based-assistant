import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import useAlanAI from '../hooks/useAlanAI';

const URL = "http://localhost:8000/api/user/"

const MainForm = () => {

    const [values, setValues] = useState()

    useEffect(() => {

        const auth = {
            headers: {
                authorization: localStorage.getItem("jwt_token")
            }
        }

        axios.get(URL, auth)
        .then((res) => {
            setValues(res.data.data)
        })
        .catch((error) => {
            window.alert(error)
        })
    })

    useAlanAI(); 

    return (
        <div>
        <br/>
        <br/>
        <br/>
        <Container >
            <pre>
            {
                JSON.stringify(values, null, 2) 
            }
            </pre>
        </Container>
    </div>
    )
}

export default MainForm
