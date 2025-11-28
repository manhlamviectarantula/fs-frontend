import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setcPassword] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v0/auth/register-user`, {
                name, email, phone, password, cPassword, address
            });
            console.log(response.data);
            setSucess('Đăng ký thành công, vui lòng đăng nhập')
            setError('')

            setName('')
            setEmail('')
            setPhone('')
            setPassword('')
            setcPassword('')
            setAddress('')
            setError('')

        } catch (err) {
            console.log(err.response.data);
            setError(err.response.data)
            setSucess('')
        }

    }

    return (
        <div>
            <Header />
            <Container style={{ margin: '30px auto', border: '1.5px solid #212121', borderRadius: '4px' }}>
                <Row style={{ alignItems: 'center' }}>
                    <Col sm={6}>
                        <div className='d-flex flex-column justify-content-center h-custom-2 w-100 ps-5 pe-5 pt-4'>
                            <h2 className="fw-bold mb-2 pb-3 mx-auto" style={{ letterSpacing: '1px' }}>Đăng ký</h2>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="name" placeholder="nhập tên..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="nhập email..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control onChange={(e) => setPhone(e.target.value)} value={phone} type="string" placeholder="nhập số điện thoại..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="nhập mật khẩu..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                                    <Form.Control onChange={(e) => setcPassword(e.target.value)} value={cPassword} type="password" placeholder="nhập lại mật khẩu..." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="nhập địa chỉ..." />
                                </Form.Group>
                                <Button type='submit' style={{ background: '#54a5ac' }} className='mb-4 w-100 py-2 mt-2' size="sm">
                                    Đăng ký
                                </Button>
                            </Form>
                            {error && <p style={{ color: 'red' }} className='mx-auto'>{error.error}</p>}
                            {sucess && <p style={{ color: 'green' }} className='mx-auto'>{sucess}</p>}
                            <p className='mx-auto d-flex'>Đã có tài khoản? <Nav.Link as={NavLink} to="/login" className="link-info"> &nbsp; Đăng nhập.</Nav.Link></p>
                        </div>
                    </Col>
                    <Col sm={6} className='d-none d-sm-block px-0'>
                        <img src="https://i.pinimg.com/564x/3a/c1/2c/3ac12c9cbbebe92627b37dcb9d119d9a.jpg"
                            alt="Login" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left', borderRadius: '4px' }} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Register
