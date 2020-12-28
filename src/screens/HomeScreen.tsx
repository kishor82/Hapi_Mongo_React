import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const HomeScreen: FunctionComponent<any> = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams<any>();

  const productList: any = useSelector((state: any) => state.productList);
  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: Product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
