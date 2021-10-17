import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
const LoginForm = () => {
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <Container >
            <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email"></Form.Control>
                    <br/>
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit" style={{width:"100%", marginLeft:"0%"}}>Log in</Button>
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
