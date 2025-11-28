import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap'
import { IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'
import axios from 'axios'
import { useSelector } from 'react-redux'
import formatNumber from '../format'
import ClearIcon from '@mui/icons-material/Clear';

const ButtonAdd = styled(Button)`
    background-color: #54a5ac;
    width: 100%; 
    border: none;
    font-weight: bold;

    &:hover{
        background-color: #a5e9ee;
    }
`

const CartItem = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1.5px solid #e0e0e0;
`

const Cart = () => {
  const currentCustomer = useSelector((state) => state.user.currentUser)

  const [cartUser, setCartUser] = useState([]);
  const [totalPriceProduct, setTotalPriceProduct] = useState()
  const [notLogin, setNotLogin] = useState()

  useEffect(() => {
    const cartUserString = localStorage.getItem("cartUser");
    if (cartUserString) {
      const cartUserArray = JSON.parse(cartUserString)

      // const totalPrice = cartUserArray.reduce((aPrice, product) => {
      //   return aPrice + product.totalAmount;
      // }, 0);

      // console.log(totalPrice);

      let totalPrice = 0;
      cartUserArray.forEach(product => {
        totalPrice += product.totalAmount;
      });

      setCartUser(cartUserArray)
      setTotalPriceProduct(totalPrice)
      // console.log(cartUser)
    }
  }, [])

  const handleMinus = (productID, productPrice) => {
    setCartUser(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productID) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1, totalAmount: item.totalAmount - item.price };
          }
        }
        return item;
      });
      localStorage.setItem('cartUser', JSON.stringify(updatedCart));
      return updatedCart;
    });

    const pMinus = cartUser.find(item => item._id === productID);
    const pQuantity = pMinus.quantity - 1
    if (pQuantity >= 1) {
      setTotalPriceProduct(prev => {
        return prev -= productPrice
      })
    }
  };

  const handlePlus = (productID, productPrice) => {
    setCartUser(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item._id === productID) {
          return { ...item, quantity: item.quantity + 1, totalAmount: item.totalAmount + item.price };
        }
        return item;
      });
      localStorage.setItem('cartUser', JSON.stringify(updatedCart));

      return updatedCart;
    });

    setTotalPriceProduct(prev => {
      return prev += productPrice
    })
  };

  const handleCheckout = async () => {
    try {
      if (!currentCustomer) {
        setNotLogin(1)
      }
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v4/order/create-order`, {
        customer: currentCustomer._id,
        // items: [{ productID: "66bf32a7aab0e3ba075af756", quantity: 1, price: 30000 }],
        items: cartUser.map(
          (product) => (
            { productID: product._id, quantity: product.quantity, price: product.price }
          )
        ),
        shippingAddress: currentCustomer.address,
        totalAmount: totalPriceProduct
      });
      localStorage.removeItem('cartUser');
      setCartUser(1)
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveCart = (productID) => {
    setCartUser(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== productID);
      localStorage.setItem('cartUser', JSON.stringify(updatedCart));
      return updatedCart;
    });

    const product = cartUser.find(item => item._id === productID);
    setTotalPriceProduct(prev => prev - product.totalAmount);
  };

  return (
    <div>
      <Header />
      <Container fluid="md" className='mt-3 mb-3'>
        {cartUser === 1 ?
          (<div className='text-center'>
            <h4 style={{ color: "green" }}>Đặt hàng thành công !</h4>
          </div>)
          :
          cartUser.length === 0 ?
            (<div className='text-center'>
              <h4>Chưa có sản phẩm nào trong giỏ hàng !</h4>
            </div>)
            :
            (<Row>
              <Col md={8}>
                {cartUser.map((product, index) => (
                  <CartItem>
                    <Image 
                    style={{ border: '2px solid black', borderRadius: '4px' }} 
                    // src={`${process.env.REACT_APP_API}/src/uploads/` + product.thumbnail} 
                    src={product.thumbnail} 
                    width={150} height={150} alt='productImage' />
                    <div className='infoItem ms-4 w-100' key={index}>
                      <div className='d-flex justify-content-between'>
                        <h4 className='pb-1'>{product.name}</h4>
                        <ClearIcon style={{ cursor: 'pointer' }} onClick={() => handleRemoveCart(product._id)} />
                      </div>
                      <h6>{formatNumber(product.price)} VND </h6>
                      <p className='m-0'><span className='fw-bold'>Mã sản phẩm:</span> {product.sku}</p>

                      <div className='mt-4 d-flex justify-content-between'>
                        <div>
                          <p className='fw-bold mb-0 ps-5'>Số lượng:</p>
                          <div className='d-flex align-items-center mt-0 ps-3'>
                            <IconButton onClick={() => handleMinus(product._id, product.price)}>
                              <RemoveIcon />
                            </IconButton>
                            <input
                              type="text"
                              value={product.quantity}
                              readOnly
                              style={{ width: '50px', textAlign: 'center' }}
                            />
                            <IconButton onClick={() => handlePlus(product._id, product.price)}>
                              <AddIcon />
                            </IconButton>
                          </div>
                        </div>
                        <div className='totalItem d-flex align-items-center'>
                          <h5 className='fw-bold mb-0 h5s-5'>Tổng: </h5>
                          <h5 className='m-0 ps-2'>{formatNumber(product.totalAmount)} VND</h5>
                        </div>
                      </div>
                    </div>
                  </CartItem>
                ))}
              </Col>
              <Col md={4}>
                <div className='bill p-3' style={{ border: '1.5px solid #e0e0e0' }}>
                  <div className='text-center'>
                    <h4 className='fw-bold'>HÓA ĐƠN</h4>
                  </div>
                  <Table>
                    <tbody>
                      <tr>
                        <td className='fw-bold'>Tổng sản phẩm:</td>
                        <td>{cartUser.length}</td>
                      </tr>
                      <tr>
                        <td className='fw-bold'>Tổng giá sản phẩm:</td>
                        <td>{formatNumber(totalPriceProduct)} VND</td>
                      </tr>
                      <tr>
                        <td className='fw-bold'>Phí vận chuyển:</td>
                        <td>không có</td>
                      </tr>
                      <tr>
                        <td className='fw-bold'>Khuyến mãi:</td>
                        <td>không có</td>
                      </tr>
                      <tr>
                        <td><h5 className='fw-bold'>Tổng đơn hàng:</h5></td>
                        <td>{formatNumber(totalPriceProduct)} VND</td>
                      </tr>
                    </tbody>
                  </Table>
                  <ButtonAdd onClick={() => handleCheckout()}>
                    Thanh toán
                  </ButtonAdd>{' '}
                  {notLogin === 1 ? <div className='text-center'><p style={{ color: 'red', marginTop: '1rem' }}>Vui lòng đăng nhập để thanh toán !</p></div> : <div></div>}
                  <p style={{ color: '#7d7d7d', marginTop: '1rem' }}>Miễn phí giao hàng áp dụng cho đơn hàng giao tận nơi từ 999.000 VND và tất cả các đơn nhận tại cửa hàng. </p>
                </div>
              </Col>
            </Row>)
        }
      </Container>
      <Footer />
    </div>
  )
}

export default Cart