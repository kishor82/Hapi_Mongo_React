import { Request } from '@hapi/hapi';
export default ({ deleteUserById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const user = await deleteUserById({ _id });
      if (!user) {
        throw generateCustomError('User not found', 404);
      }
      return { statusCode: 200, data: { message: 'User removed successfully.' } };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
