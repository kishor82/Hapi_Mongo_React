import React, { useState, FunctionComponent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

interface Props {
  history: any;
}

const PaymentScreen: FunctionComponent<Props> = ({ history }) => {
  const { shippingAddress } = useSelector((state: any) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const submitHandler = (e: React.FormEvent<any>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPaymentMethod((e.target as HTMLInputElement).value)
              }
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPaymentMethod((e.target as HTMLInputElement).value)
              }
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
