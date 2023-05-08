module.exports = {
  apps: [
    {
      name: 'dubs-site',
      script: './build/index.js',
      node_args: '-r dotenv/config',
      env: {
        NODE_ENV: 'production',
        PORT: '5001',
      },
    },
  ],
}
