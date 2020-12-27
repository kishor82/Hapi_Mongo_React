import React, { useEffect, FunctionComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

interface Props {}

const ProductListScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pageNumber = 1 } = useParams<any>();

  const { loading, error, products, page, pages } = useSelector((state: any) => state.productList);

  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(
    (state: any) => state.productDelete
  );

  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = useSelector(
    (state: any) => state.productCreate
  );

  const { userInfo } = useSelector((state: any) => state.userLogin);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id: string) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProduct(id));
      }
    });
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
