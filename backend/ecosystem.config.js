module.exports = {
  apps: [
    {
      name: 'dubs-backend',
      script: './build/backend/src/server.js',
      env: {
        NODE_ENV: 'production',
        DUBS_PORT: 5004,
        DUBS_ORIGIN: 'https://dubs-apiculture.ch',
        PAYLOAD_CONFIG_PATH: './build/backend/src/payload.config.js',
        MONGODB_URL: 'mongodb://localhost/dubs',
      },
    },
  ],
}
