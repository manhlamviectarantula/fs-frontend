import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, Stack } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Pagination from '@mui/material/Pagination';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FilterList from '../components/FilterList';
import Breadcrumb from '../components/Breadcrumbs';
import { TextField } from '@mui/material';
import formatNumber from '../format'

const genderOptions = [
    { value: 'Nữ' },
    { value: 'Nam' },
    // { value: 'Unisex' }
];

const brandOptions = [
    { value: 'Uniqlo' },
    { value: 'Versace' },
    { value: 'Jeansx' },
    { value: 'ShirtTT' },
    { value: 'DRY-EX' }
]

const countryOptions = [
    { value: 'Trung Quốc' },
    { value: 'Mỹ' },
    { value: 'Úc' },
]

const ProductList = () => {
    const location = useLocation()
    const catName = location.pathname.split("/")[2]
    const catTitle = location.state.title
    // console.log(catTitle)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState('')

    const [search, setSearch] = useState("")

    const [sex, setSex] = useState('')
    const [brand, setBrand] = useState('')
    const [country, setCountry] = useState('')

    const [sort, setSort] = useState({ sort: "price", order: "asc" })
    const handleSortPriceD = () => {
        setSort({ sort: "price", order: "desc" })
    }

    const handleSortPriceA = () => {
        setSort({ sort: "price", order: "asc" })
    }

    useEffect(() => {
        const local = `${process.env.REACT_APP_API}/api/v2/product/get-product`
        const url = `${local}?category=${catName}&page=${page}&search=${search}&sex=${sex}&brand=${brand}&country=${country}&sortField=${sort.sort},${sort.order}`
        axios.get(url)
            .then(result => {
                setProducts(result.data.allProduct);
                setTotalPage(result.data.totalPages);
                // setPage(1);
                // console.log(result.data.allProduct)
                // console.log(url)
            })
            .catch(err => console.log(err));
    }, [catName, page, sex, brand, country, sort, search]);

    const handlePageChange = (event, page) => {
        setPage(page)
    }

    const handleSexFilter = (value) => {
        setSex(value)
        setPage(1);
    }

    const handleBrandFilter = (value) => {
        setBrand(value);
        setPage(1);
    };

    const handleCountryFilter = (value) => {
        setCountry(value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())
        setPage(1)
    }

    return (
        <div>
            <Header />
            <div className="container product-list mt-4 mb-4">
                <Breadcrumb />
                <div className="row mt-3">
                    <div className="col-3">
                        <div className="sidebar">
                            <div className="sider-label">
                                <FilterAltIcon></FilterAltIcon>
                                <h5 style={{ margin: 0 }}>Bộ lọc tìm kiếm</h5>
                            </div>
                            <div className="filter-list">
                                <FilterList handleFilter={handleSexFilter}
                                    title="Giới tính:"
                                    options={genderOptions}
                                />
                                <FilterList handleFilter={handleBrandFilter}
                                    title="Thương hiệu:"
                                    options={brandOptions}
                                />
                                <FilterList handleFilter={handleCountryFilter}
                                    title="Xuất xứ"
                                    options={countryOptions}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <Stack className='sort' direction="horizontal" gap={2}>
                            <div>Sắp xếp theo: </div>
                            {/* <Button size="sm" variant="secondary">Tất cả</Button>{' '} */}
                            {/* <Button size="sm" variant="secondary" onClick={handleSortNew}>Mới nhất</Button>{' '} */}
                            <Button size="sm" variant="secondary" onClick={handleSortPriceD}>Giá giảm dần</Button>{' '}
                            <Button size="sm" style={{ marginRight: 'auto' }} variant="secondary" onClick={handleSortPriceA}>Giá tăng dần</Button>{' '}
                            <TextField
                                id="outlined-basic"
                                label="Tìm sản phẩm"
                                variant="outlined"
                                onChange={(e) => handleSearch(e)}
                            />
                        </Stack>
                        <div className="row g-4">
                            {products.length > 0 ? (
                                <>
                                    {products.map((product, index) => (
                                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                                            <Nav.Link
                                                as={NavLink}
                                                to={`/categoryList/${catName}/${product._id}`}
                                                state={{ title: catTitle, name: catName, product: product.name }}
                                                className="card"
                                            >
                                                <img src={product.thumbnail} className="card-img-top" alt={product.name} />
                                                {/* <img src={`${process.env.REACT_APP_API}/src/uploads/` + product.thumbnail} className="card-img-top" alt={product.name} /> */}
                                                <div className="card-body">
                                                    <h6 className="card-title fw-bold">{product.name}</h6>
                                                    <p style={{ marginBottom: '5px' }} className="card-price fw-bold">{formatNumber(product.price)} VND</p>
                                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="small" readOnly />
                                                    <p className="card-country">Thương hiệu: {product.brand}</p>
                                                </div>
                                            </Nav.Link>
                                        </div>
                                    ))}
                                    <Stack className="p-4 w-100">
                                        <Pagination className="mx-auto" count={totalPage} onChange={handlePageChange} />
                                    </Stack>
                                </>
                            ) : (
                                <h5 className="text-center pt-2">Không có sản phẩm đang tìm !!</h5>
                            )}
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductList;
