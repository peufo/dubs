module.exports = {
  apps: [
    {
      name: 'dubs-backend',
      script: './build/backend/src/server.js',
      env: {
        NODE_ENV: 'production',
        PAYLOAD_CONFIG_PATH: './build/backend/src/payload.config.js',
      },
    },
  ],
}
