import { Server } from '@hapi/hapi';
import { greetWelcomeAction } from './controllers';
import { API_ROUTE_GREETING } from './common/constants';
export const routes = (server: Server) => {
  server.route([
    {
      method: 'GET',
      path: `${API_ROUTE_GREETING}`,
      options: {
        auth: false,
        description: 'Greet with welcome message',
        tags: ['api'],
        handler: greetWelcomeAction,
      },
    },
  ]);
};
