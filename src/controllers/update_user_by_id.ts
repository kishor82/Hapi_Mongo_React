import { Request } from '@hapi/hapi';
export default ({ updateUserById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const user = await updateUserById({
        _id,
        dataToUpdate: {
          ...(request.payload as any),
        },
      });

      if (!user) {
        throw generateCustomError('User not found', 404);
      }
      return {
        statusCode: 200,
        data: user,
      };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
