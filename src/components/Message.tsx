import React, { FunctionComponent } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
  variant?: string;
  children: any;
}

const Message: FunctionComponent<Props> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
