import axios from 'axios'
import { React, useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

const URL = "http://localhost:8000/api/user/"

const Registration = () => {
    const initValues = {
        name: "", 
        email: "",
        password: "",
        confirm_password: "", 
        address: "", 
        phone_number: ""
    }
    const [values, setValues] = useState(initValues)
    let history = useHistory()

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const register = (event) => {
        event.preventDefault()

        if(values.password !== values.confirm_password) {
            window.alert("Error, password and confirm password must match")
            return
        }

        let data = {
                name: values.name, 
                email_address: values.email,
                password: values.password,
                name: values.confirm_password,
                address: values.address, 
                phone_number: values.phone_number
        }

        axios.post(URL, data)
            .then((res) => {
                if(res.status === 200) {
                    window.alert("Registration Successful");
                    history.push("/login")
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }

    return (
        <div>
        <br/>
        <br/>
        <br/>
        <Container >
            <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
                <Form.Group>
                    <Form.Control name="name" placeholder="Name" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="email" type="email" placeholder="Email" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="address"  placeholder="Address" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="phone_number" placeholder="Phone Number" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="confirm_password" type="password" placeholder="Confirm Password" onChange={onChange}></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" style={{width:"100%", marginLeft:"0%"}} onClick={register}>
                    Sign Up
                </Button>
            </Form>
        </Container>
    </div>
    )
}

export default Registration; 
