import React from 'react';
import "bootstrap/dist/css/bootstrap.css"; 
import LoginForm from './components/LoginForm';
import LoginImage from './components/LoginImage';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './components/Navigation';

function Login() {
    return (
        <div className="Login">
            <Navigation/>
            <Container>
                <Row>
                    <Col>
                        <LoginForm />
                    </Col>
                    <Col>
                    <LoginImage/>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Login;