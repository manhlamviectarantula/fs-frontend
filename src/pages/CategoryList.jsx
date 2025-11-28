import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumbs'

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/v3/category/get-all-category`)
      .then(result => {
        setCategories(result.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Container className='category-list mt-4 mb-4'>
        <Breadcrumb />
        <Row>
          {categories.map((cat, index) => (
            <Col md={3} className='mt-3 mb-3' key={index}>
              <div className='g-4'>
                <Nav.Link
                  as={NavLink}
                  to={`/categoryList/${cat.name}`}
                  state={{ title: cat.title, name: cat.name}}
                  className="card"
                >
                  <img src={cat.thumbnail} className="card-img-top" alt={cat.title} />
                  <div className="card-body text-center">
                    <h6 className="card-title fw-bold">{cat.title}</h6>
                  </div>
                </Nav.Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default CategoryList
