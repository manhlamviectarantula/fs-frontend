import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChangePw = () => {
    const navigate = useNavigate()

    const user = useSelector((state) => state.user.currentUser)
    const id = user._id
    const token = user.accessToken

    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [cNewPass, setCNewPass] = useState()
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');

    const UpdatePW = (e) => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_API}/api/v1/user/update-pw/` + id, {
                oldPass,
                newPass,
                cNewPass,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log(result);

                setSucess('Đổi mật khẩu thành công !!')
                setError('')
            })
            .catch((err) => {
                console.log(err)

                setError(err.response.data)
                setSucess('')
            });
    }

    const cancle = () => {
        navigate("/account")
    }

    return (
        <div>
            <Header />
            <Container
                style={{
                    margin: "30px auto",
                    border: "1.5px solid #212121",
                    borderRadius: "4px",
                }}
            >
                <Row style={{ alignItems: "center" }}>
                    <Col sm={6}>
                        <div className="d-flex flex-column justify-content-center h-custom-2 w-100 ps-5 pe-5 pt-4">
                            <h2
                                className="fw-bold mb-2 pb-3 mx-auto"
                                style={{ letterSpacing: "1px" }}
                            >
                                Đổi mật khẩu
                            </h2>
                            <Form onSubmit={UpdatePW}>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Mật khẩu cũ</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setOldPass(e.target.value)}
                                        type="password"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Mật khẩu mới</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setNewPass(e.target.value)}
                                        type="password"
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setCNewPass(e.target.value)}
                                        type="password"
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    {error && <p style={{ color: 'red' }} className='mx-auto'>{error.error}</p>}
                                    {sucess && <p style={{ color: 'green' }} className='mx-auto'>{sucess}</p>}
                                </div>
                                <Button
                                    type="submit"
                                    style={{ background: "#54a5ac", border: "none" }}
                                    className="mb-1 w-100 py-2 mt-2"
                                    size="sm"
                                >
                                    Lưu thay đổi
                                </Button>
                            </Form>
                            <Button
                                onClick={cancle}
                                style={{ background: "grey", border: "none" }}
                                className="mb-3 w-100 py-2"
                                size="sm"
                            >
                                Thoát
                            </Button>
                        </div>
                    </Col>
                    <Col sm={6} className="d-none d-sm-block px-0">
                        <img
                            src="https://i.pinimg.com/474x/fd/41/91/fd4191540124b724cb5d5e91e9c430ec.jpg"
                            alt="Login"
                            className="w-100"
                            style={{
                                objectFit: "cover",
                                objectPosition: "left",
                                borderRadius: "4px",
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default ChangePw
