module.exports = {
  apps: [
    {
      name: 'dubs-backend',
      script: './build/backend/src/server.js',
      env: {
        PAYLOAD_CONFIG_PATH: './build/backend/src/payload.config.js',
        NODE_ENV: 'production',
        MONGODB_URL: 'mongodb://localhost/dubs',
        DUBS_PORT: 5004,
        DUBS_ORIGIN: 'https://dubs-apiculture.ch/',
      },
    },
  ],
}
