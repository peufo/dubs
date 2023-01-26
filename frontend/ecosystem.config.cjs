module.exports = {
  apps: [
    {
      name: 'dubs-site',
      script: './build/index.js',
      env: {
        NODE_ENV: 'production',
        DUBS_PORT: 5004,
        DUBS_ORIGIN: 'https://dubs-apiculture.ch/',
      },
    },
  ],
}
