import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';

export default async (server: Server) => {
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'API Documentation',
    },
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: [] }],
    auth: false
  };

  const plugins: Array<ServerRegisterPluginObject<any>> = [
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];

  /**
   * Route for build directory to support react routes.
   */

  server.route({
    method: 'GET',
    path: '/{param*}',
    options: { auth: false },
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        lookupCompressed: true,
        index: true,
      },
    },
  });
  await server.register(plugins);
};
