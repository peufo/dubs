const DUBS_PORT = 5004

module.exports = {
  apps: [
    {
      name: 'dubs-site',
      script: './frontend/build/index.js',
      env: {
        DUBS_PORT,
      },
    },
    {
      name: 'dubs-backend',
      script: './backend/build/backend/src/server.js',
      env: {
        PAYLOAD_CONFIG_PATH: './backend/build/backend/src/payload.config.js',
        NODE_ENV: 'production',
        MONGODB_URL: 'mongodb://localhost/dubs',
        DUBS_PORT,
      },
    },
  ],
}
