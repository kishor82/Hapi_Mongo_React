import { Request } from '@hapi/hapi';
export default ({ getUserById, updateUserById, generateToken, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { _id } = request.auth.credentials;
      const { name, email, password } = request.payload as any;
      const user = await getUserById({ _id });

      if (!user) {
        throw generateCustomError('User not found', 404);
      }
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      return {
        statusCode: 200,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id, updatedUser.email),
        },
      };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
