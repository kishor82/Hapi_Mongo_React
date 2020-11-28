import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getUserByEmail, generateToken, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { email, password } = request.payload as any;
      const user = await getUserByEmail({ email });
      if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin } = user;
        return { statusCode: 200, data: { _id, name, email, isAdmin, token: generateToken(_id) } };
      } else {
        return h.response({ statusCode: 401, data: { message: 'Invalid email or password' } }).code(401);
      }
    } catch (err) {
      throw wrapError(err);
    }
  };
};
