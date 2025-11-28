import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { IconButton, Rating } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import formatNumber from '../format'
import Breadcrumb from '../components/Breadcrumbs';

const ImageItem = styled(Image)`
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid black;
`;

const ButtonAdd = styled(Button)`
    background-color: #54a5ac;
    width: 100%; 
    border: none;
    font-weight: bold;

    &:hover {
        background-color: #a5e9ee;
    }
`;

const WrapperDescription = styled.div`
    padding: 1rem;
    border-radius: 5px;
    border: 2px dashed black;
`;

const InfoProduct = styled.p`
    padding-bottom: 0.2rem;
    margin-bottom: 0.3rem;
    border-bottom: 1px solid RGB(176 177 178);
`;

const WrapperInfoProduct = styled.div`
    padding: 1rem;
    border-radius: 5px;
    border: 2px dashed black;
`;

const DetailsProduct = () => {
    const [product, setProduct] = useState({});
    const [currentImage, setCurrentImage] = useState('');
    const [quantity, setQuantity] = useState(1)

    const location = useLocation();
    const id = location.pathname.split("/")[3];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v2/product/get-one-product/${id}`);
                // console.log(res.data);
                setProduct(res.data);
                setCurrentImage(res.data.thumbnail);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        getProduct();
    }, [id]);

    const handleImageChange = (imageIndex) => {
        if (imageIndex === 4) {
            setCurrentImage(product.thumbnail);
        } else {
            setCurrentImage(product.images[imageIndex]);
        }
    };

    const handleMinus = () => {
        if (quantity === 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
        }
    }

    const handlePlus = () => {
        setQuantity(quantity + 1)
    }

    const handleAddCart = () => {
        const cartUser = JSON.parse(localStorage.getItem("cartUser")) || [];
        const existingProductIndex = cartUser.findIndex(item => item._id === product._id);

        if (existingProductIndex !== -1) {
            cartUser[existingProductIndex].quantity += quantity;
            cartUser[existingProductIndex].totalAmount = cartUser[existingProductIndex].price * cartUser[existingProductIndex].quantity
        } else {
            const totalAmount = product.price * quantity
            cartUser.push({ ...product, quantity, totalAmount: totalAmount });
        }

        localStorage.setItem("cartUser", JSON.stringify(cartUser));
    };

    return (
        <div>
            <Header />
            <Container className='mt-4 mb-4' fluid='md'>
                <Breadcrumb />
                <Row>
                    <Col md={7}>
                        <div className='d-flex gap-4 align-items-center p-2 mt-4'>
                            <div className='d-flex flex-column gap-4'>
                                <ImageItem
                                    onClick={() => handleImageChange(4)}
                                    src={product.thumbnail}
                                    // src={`${process.env.REACT_APP_API}/src/uploads/` + product.thumbnail}

                                    width={100}
                                    height={100}
                                    alt='product'
                                />
                                {product.images && product.images.length > 0 && (
                                    <>
                                        <ImageItem
                                            onClick={() => handleImageChange(0)}
                                            // src={`${process.env.REACT_APP_API}/src/uploads/` + product.images[0]}
                                            src={product.images[0]}

                                            width={100}
                                            height={100}
                                            alt='product'
                                        />
                                        <ImageItem
                                            onClick={() => handleImageChange(1)}
                                            // src={`${process.env.REACT_APP_API}/src/uploads/` + product.images[1]}
                                            src={product.images[1]}

                                            width={100}
                                            height={100}
                                            alt='product'
                                        />
                                        <ImageItem
                                            onClick={() => handleImageChange(2)}
                                            // src={`${process.env.REACT_APP_API}/src/uploads/` + product.images[2]}
                                            src={product.images[2]}

                                            width={100}
                                            height={100}
                                            alt='product'
                                        />
                                    </>
                                )}
                            </div>
                            <div>
                                <Image
                                    style={{ border: '2px solid black' }}
                                    // src={`${process.env.REACT_APP_API}/src/uploads/` + currentImage}
                                    src={currentImage}

                                    width={500}
                                    height={500}
                                    alt='productImage'
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className='p-2 mt-4'>
                            <h1 className='fw-bold pb-3'>{product.name}</h1>
                            <div className='d-flex justify-content-between pb-2'>
                                <h2>{formatNumber(product.price)} VND </h2>
                                <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="small" readOnly />
                            </div>
                            <p className='m-0'><span className='fw-bold'>Mã sản phẩm:</span> {product.sku}</p>
                            <p className='m-0'><span className='fw-bold'>Tình trạng:</span> còn hàng</p>
                            <div className='d-flex mt-4'>
                                <div className='text-center'>
                                    <p className='fw-bold mb-0'>Số lượng:</p>
                                    <div className='d-flex align-items-center mt-0'>
                                        <IconButton onClick={() => handleMinus()}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <input
                                            type="text"
                                            value={quantity}
                                            min={1}
                                            readOnly
                                            style={{ width: '50px', textAlign: 'center' }}
                                        />
                                        <IconButton onClick={() => handlePlus()}>
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <ButtonAdd onClick={() => handleAddCart()}>
                                    THÊM VÀO GIỎ HÀNG
                                </ButtonAdd>{' '}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-4 mb-4'>
                <Row>
                    <Col md={7}>
                        <WrapperDescription>
                            <h3 className='fw-bold pb-3 m-0'>Mô tả sản phẩm</h3>
                            <p>{product.description}</p>
                        </WrapperDescription>
                    </Col>
                    <Col md={5}>
                        <WrapperInfoProduct>
                            <InfoProduct><span className='fw-bold'>Giới tính: </span> {product.sex}</InfoProduct>
                            <InfoProduct><span className='fw-bold'>Thương hiệu: </span> {product.brand}</InfoProduct>
                            <InfoProduct><span className='fw-bold'>Xuất xứ: </span> {product.country}</InfoProduct>
                            <InfoProduct><span className='fw-bold'>Màu: </span> {product.color}</InfoProduct>
                        </WrapperInfoProduct>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default DetailsProduct;
