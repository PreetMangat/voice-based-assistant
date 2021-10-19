import axios from 'axios'
import { React, useState } from 'react'
import {Form, Button, Container} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
import { useHistory } from "react-router-dom";

const URL = "http://localhost:8000/api/login/"

const LoginForm = () => {
    const initValues = {
        email: "",
        password: "",
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

    const login = (event) => {
        event.preventDefault()

        let data = {
                email_address: values.email,
                password: values.password,
        }

        axios.post(URL, data)
            .then((res) => {
                if(res.status === 200) {
                    localStorage.setItem('jwt_token', res.data.accessToken)
                    history.push("/main")
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
                    <Form.Control name="email" type="email" placeholder="Email" onChange={onChange}></Form.Control>
                    <br/>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={onChange}></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" onClick={login} style={{width:"100%", marginLeft:"0%"}}>Log in</Button>
                <br/> 
                <br/>
                <br/>
                <br/>
                <Form.Text className="text-muted" style={{width: "100%", marginLeft:"20%"}}>
                    Need an account? 
                <Link to="/register" class="text-decoration-none"> Sign up</Link>
                </Form.Text> 
            </Form>
            </Container>
        </div>
    )
}

export default LoginForm; 
