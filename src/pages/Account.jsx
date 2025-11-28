import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../redux/userRedux";
import { useNavigate  } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.currentUser)
  const id = user._id
  const token = user.accessToken

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [error, setError] = useState('');
  const [sucess, setSucess] = useState('');

  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch);
  };

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/account/update-account/" + id, {
        name,
        email,
        phone,
        address,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(updateUser({ name, email, phone, address }));

        setSucess('Sửa thông tin thành công !!')
        setError('')
      })
      .catch((err) => {
        console.log(err)

        setError(err.response.data)
        setSucess('')
      });
  };

  const toChangePw = () =>{
    navigate("change-pw");
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
                Thông tin tài khoản
              </h2>
              <Form onSubmit={Update} >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    value={email}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    onChange={(e) => setPhone(e.target.value)}
                    type="string"
                    value={phone}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    value={address}
                  />
                </Form.Group>
                <div className="text-center">
                  {error && <p style={{ color: 'red' }} className='mx-auto'>{error.error}</p>}
                  {sucess && <p style={{ color: 'green' }} className='mx-auto'>{sucess}</p>}
                </div>
                <Button
                  type="submit"
                  style={{ background: "#54a5ac", border: "none" }}
                  className="mb-5 w-100 py-2 mt-2"
                  size="sm"
                >
                  Lưu thay đổi
                </Button>
              </Form>
              {/* <Button
                style={{ background: "#6c757d", border: "none" }}
                className="mb-3 w-100 py-2 mt-1"
                size="sm"
              >
                Lịch sử giao dịch
              </Button> */}
              <Button onClick={toChangePw}
                style={{ background: "#54a5ac", border: "none" }}
                className="mb-3 w-100 py-2 mt-1"
                size="sm"
              >
                Đổi mật khẩu
              </Button>
              <Button
                onClick={handleLogout}
                style={{ background: "#dc3545", border: "none" }}
                className="mb-3 w-100 py-2 mt-1"
                size="sm"
              >
                Đăng xuất
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
};

export default Account;
