import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Path from 'path';
import * as HapiSwagger from 'hapi-swagger';
import { Server, ServerRegisterPluginObject } from '@hapi/hapi';
import Joi from 'joi';
import uploadFile from '../utils/upload_file';

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
    auth: false,
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

  await server.register(plugins);

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

  server.route({
    method: 'GET',
    path: '/uploads/{p*}',
    options: { auth: false },
    handler: {
      directory: {
        path: Path.join(__dirname, '../../uploads'),
      },
    },
  });

  const imageValidator = Joi.string()
    .regex(/(jpe?g|png)$/i)
    .message('Image must of type jpe,jpeg or png !')
    .required();

  server.route({
    method: 'POST',
    path: '/upload',
    options: {
      auth: {
        strategy: 'jwt',
        scope: 'admin',
      },
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 2 * 1000 * 1000,
        multipart: {
          output: 'stream',
        },
      },
      validate: {
        payload: Joi.object({
          file: Joi.object({
            hapi: Joi.object({
              filename: imageValidator,
              headers: Joi.object({
                'content-type': imageValidator,
              }).unknown(true),
            }).unknown(true),
          })
            .unknown(true)
            .meta({ swaggerType: 'file' })
            .required(),
        }).required(),
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      description: 'Upload file to server.',
      tags: ['api'],
    },
    handler: async (request: any) => {
      try {
        const { file } = request.payload;
        const uploadDir = 'uploads';
        const fileName = `${Date.now()}-${file.hapi.filename.split(' ').join('-')}`;
        const finalPath = Path.join(__dirname, `../../${uploadDir}`);
        const uploadedPath = await uploadFile(file, finalPath, fileName, (err: any, result: any) => {
          if (err) {
            return err;
          }
          return `/${uploadDir}/${result}`;
        });

        return uploadedPath;
      } catch (err) {
        throw err;
      }
    },
  });
};
