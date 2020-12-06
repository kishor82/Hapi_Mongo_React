import jwt from 'jsonwebtoken';
import config from '../config';

const generateToken = (_id: string, email: string) => {
  const { jwt_secret_key } = config;
  return jwt.sign({ _id, email }, jwt_secret_key, {
    expiresIn: '30d',
  });
};

export default generateToken;
