import { readFileSync } from 'fs';
import defaultValidationErrorHandler from './default_validation_error_handler';
import Path from 'path';

const readFile = (file: any) => {
  return readFileSync(file, 'utf8');
};

const getServerOptions = (config: any) => {
  const options: any = {
    host: config.host,
    port: config.port,
    routes: {
      validate: {
        failAction: defaultValidationErrorHandler,
        options: {
          abortEarly: false,
        },
      },
      files: {
        relativeTo: Path.join(__dirname, '../../build'),
      },
    },
  };

  if (config.ssl.enabled && (!config.ssl.key || !config.ssl.certificate)) {
    throw new Error('must specify [certificate] and [key] when ssl is enabled');
  }

  if (config.ssl.enabled) {
    const ssl = config.ssl;
    const tlsOptions = {
      ca: ssl.certificateAuthorities,
      cert: readFile(ssl.certificate),
      honorCipherOrder: true,
      key: readFile(ssl.key),
    };
    options.tls = tlsOptions;
  }

  return options;
};

export default getServerOptions;
