import { Server, Request, ResponseToolkit, server } from '@hapi/hapi';
import { routes } from './routes';
import Inert from '@hapi/inert';
import config from './config';
import logging from './services/logging';
import { createMongoConnectoin } from './data-access';
import getServerOptions from './services/http_tools';
import registerPlugins from './services/register_plugins';
(async () => {
  const server = new Server(getServerOptions(config.server));

  await server.register([{ plugin: Inert }]);
  await logging(server, config);
  try {
    createMongoConnectoin(server, config);
    routes(server);
    await registerPlugins(server);
    server.ext({
      type: 'onPreResponse',
      method: async (request: Request, h: ResponseToolkit) => {
        const { response } = request;
        if (response && 'isBoom' in response && !response.isBoom) {
          return h.continue;
        }

        if (response && 'isBoom' in response && response.output.statusCode === 404) {
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
    server.log(['fatal'], err);
  });
})();
