import React, { FunctionComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
interface Props {}

const Footer: FunctionComponent<Props> = (props) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; E-commerce</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
