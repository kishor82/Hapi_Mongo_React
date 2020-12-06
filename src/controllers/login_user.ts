import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getUserByEmail, generateToken, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { email, password } = request.payload as any;
      const user = await getUserByEmail({ email });
      if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin } = user;
        return { statusCode: 200, data: { _id, name, email, isAdmin, token: generateToken(_id, email) } };
      } else {
        throw generateCustomError('Invalid email or password', 401);
      }
    } catch (err) {
      throw wrapError(err);
    }
  };
};
