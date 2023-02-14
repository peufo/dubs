module.exports = {
  apps: [
    {
      name: 'dubs-site',
      script: './build/index.js',
      node_args: '-r dotenv/config',
      env: {
        NODE_ENV: 'production',
        DUBS_PORT: 5004,
        DUBS_ORIGIN: 'https://dubs-apiculture.ch',
      },
    },
  ],
}
