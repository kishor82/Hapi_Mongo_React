import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getUserByEmail, generateToken, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { email, password } = request.payload as any;
      const user = await getUserByEmail({ email });
      if (user && (await user.matchPassword(password))) {
        let scopes;
        const { _id, name, email, isAdmin } = user;
        // Check if the user object passed in
        // has admin set to true, and if so, set
        // scopes to admin
        if (isAdmin) {
          scopes = 'admin';
        }

        return { statusCode: 200, data: { _id, name, email, isAdmin, token: generateToken(_id, email, scopes) } };
      } else {
        throw generateCustomError('Invalid email or password', 401);
      }
    } catch (err) {
      throw wrapError(err);
    }
  };
};
