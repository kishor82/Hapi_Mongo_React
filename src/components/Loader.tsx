import React, { FunctionComponent } from 'react';
import { Spinner } from 'react-bootstrap';
interface Props {}

const Loader: FunctionComponent<Props> = (props) => {
  return (
    <Spinner animation="border" role="status" style={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
