import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getUserByEmail, createNewUser, generateToken, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { name, email, password } = request.payload as any;
      const userExists = await getUserByEmail({ email });
      if (userExists) {
        throw generateCustomError('User already exists.', 409);
      }
      const user = await createNewUser({
        userData: {
          name,
          email,
          password,
        },
      });

      if (user) {
        const { _id, name, email, isAdmin } = user;
        let scopes;
        // Check if the user object passed in
        // has admin set to true, and if so, set
        // scopes to admin
        if (isAdmin) {
          scopes = 'admin';
        }
        return h
          .response({ statusCode: 201, data: { _id, name, email, isAdmin, token: generateToken(_id, email, scopes) } })
          .code(201);
      } else {
        throw generateCustomError('Invalid user data.', 400);
      }
    } catch (err) {
      throw wrapError(err);
    }
  };
};
