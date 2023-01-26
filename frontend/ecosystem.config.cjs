module.exports = {
  apps: [
    {
      name: 'dubs-site',
      script: './build/index.js',
      env: {
        DUBS_PORT: 5004,
      },
    },
  ],
}
