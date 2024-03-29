export = {
  logging: {
    silent: false,
    quiet: false,
    verbose: false,
    json: true,
    events: {},
    // Provide destination name starting from the root directory.
    dest: 'stdout',
    filter: {},
    timezone: 'UTC',
    ops: { interval: 5000 },
  },
  mongo: {
    hosts: ['mongo:27017'],
    database: 'ecom',
    username: '',
    password: '',
    debug: true,
    authSource: '',
    replicaSet: '',
    isLocal: true,
    server: {
      auto_reconnect: true,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 7781,
    ssl: {
      enabled: false,
      certificate: '',
      key: '',
      certificateAuthorities: [],
    },
  },
  healthCheck: {
    delay: 5000,
  },
  jwt_secret_key: '=Bu^%A@^F#SwsYhF3&kSR6!FA*C2U6nz',
  paypal_client_id: '',
  cloudinary: {
    cloud_name: '',
    api_key: '',
    api_secret: '',
  },
};
