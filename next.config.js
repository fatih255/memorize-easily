/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    accessTokenSecret: 'accessTokenSecret1',
    refreshTokenSecret: 'refreshTokenSecret1',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'http://localhost:3000/api' // production api
  }
}

module.exports = nextConfig
