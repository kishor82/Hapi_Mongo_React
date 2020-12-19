import React, { useEffect, useState, FunctionComponent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

interface Props {
  location: any;
  history: any;
}

const ProfileScreen: FunctionComponent<Props> = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(undefined);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [message, setMessage] = useState<any>(null);

  const dispatch = useDispatch();

  const { loading, user, error: detailError } = useSelector((state: any) => state.userDetails);
  const { userInfo } = useSelector((state: any) => state.userLogin);
  const { success, error: profileError } = useSelector((state: any) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e: React.FormEvent<any>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>User Profile</h2>
        {detailError && <Message variant="danger">{detailError}</Message>}
        {profileError && <Message variant="danger">{profileError}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>name Address</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e: React.ChangeEvent<any>) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e: React.ChangeEvent<any>) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>password Address</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e: React.ChangeEvent<any>) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e: React.ChangeEvent<any>) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={6}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
