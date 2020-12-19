import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
  children: any;
}

const FormContainer: FunctionComponent<Props> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
