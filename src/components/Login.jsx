import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setData({}); // Clear the input fields
        setError(null); // Clear any error messages
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        console.log(data);
    };

    const handleLogin = async () => {
        try {
            let response = await axios.post('http://localhost:4000/login', data);
            console.log(response);
            toast.success('Login successful'); // Display login success message
        } catch (e) {
            setError(e.response.data);
            toast.error(e.response.data); // Display error message
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:4000/register', data);
            console.log(response.data);
            toast.success('Registration successful'); // Display registration success message
        } catch (e) {
            setError(e.response.data);
            toast.error(e.response.data); // Display error message
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Col md={6} lg={4}>
                <div className="border p-4 rounded">
                    <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
                    <Form>
                        {!isLogin && (
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name='name'
                                    type="text"
                                    placeholder="Enter your name"
                                    value={data.name || ''} // Bind the value to the state
                                    onChange={handleChange}
                                    required />
                            </Form.Group>
                        )}
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name='email'
                                type="email"
                                placeholder="Enter your email"
                                value={data.email || ''} // Bind the value to the state
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                                value={data.password || ''} // Bind the value to the state
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Button variant="primary" type="button" className="w-100 mt-3" onClick={isLogin ? handleLogin : handleRegister}>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Form>
                    <Button variant="link" onClick={toggleForm} className="w-100 mt-2">
                        {isLogin ? 'Go to Register' : 'Go to Login'}
                    </Button>
                </div>
            </Col>
        </Container>
    );
}

export default Login;
