import { Server } from '@hapi/hapi';
import JWT from 'hapi-auth-jwt2';

export default async (server: Server, config: any) => {
  const { jwt_secret_key } = config;

  await server.register({
    plugin: JWT,
  });
  server.auth.strategy('jwt', 'jwt', {
    key: jwt_secret_key,
    validate: async (decoded: any) => {

      /**
       * TODO:
       *   get user from database using _id from  deocoded object.
       */

      if (!decoded) {
        return { isValid: false };
      }
      return { isValid: true };
    },
    verifyOptions: { algorithms: ['HS256'] },
  });

  /**
   * Set default auth strategy for all routes.
   */
  server.auth.default('jwt');
};
