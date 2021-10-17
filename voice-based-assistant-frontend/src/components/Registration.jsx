import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const Registration = () => {
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
                <br/>
                <Form.Control type="password" placeholder="Confirm Password"></Form.Control>
            </Form.Group>
            <br/>
            <Button type="submit" style={{width:"100%", marginLeft:"0%"}}>Sign Up</Button>
        </Form>
        </Container>
    </div>
    )
}

export default Registration; 
