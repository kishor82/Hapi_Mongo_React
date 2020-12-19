import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { routes } from './routes';
import Inert from '@hapi/inert';
import config from './config';
import logging from './services/logging';
import { createMongoConnectoin } from './data_access';
import getServerOptions from './services/http_tools';
import registerPlugins from './services/register_plugins';
import registerStrategy from './services/register_strategy';
import wrapError from './utils/wrap_error';
(async () => {
  const server = new Server(getServerOptions(config.server));

  await server.register([{ plugin: Inert }]);
  await logging(server, config);
  try {
    createMongoConnectoin(server, config);
    await registerPlugins(server);
    await registerStrategy(server, config);
    routes(server,config);
    server.ext({
      type: 'onPreResponse',
      method: async (request: Request, h: ResponseToolkit) => {
        const { response } = request;
        if (response && 'isBoom' in response && !response.isBoom) {
          return h.continue;
        }
        /**
         * Redirect to index.html if requested path from from frontend doesn't exist.
         */
        if (response && 'isBoom' in response && response.output.statusCode === 404 && response.data?.path) {
          return h.file('index.html');
        }
        return h.continue;
      },
    });

    await server.start();
    server.log(['info', 'listening'], ` Server running at ${server.info.uri}`);
    server.log(['info', 'swagger', 'listening'], `Visit  ${server.info.uri}/documentation# for API documentation.`);
  } catch (err) {
    let reason = err;
    if (reason) {
      if (reason.code === 'EADDRINUSE' && Number.isInteger(reason.port)) {
        reason = new Error(`Port ${reason.port} is already in use!`);
      }
      server.log(['fatal'], reason);
      server.stop();
    }
  }
  process.on('unhandledRejection', (err: any) => {
    server.log(['fatal'], wrapError(err));
  });
})();
