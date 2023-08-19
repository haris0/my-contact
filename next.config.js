/** @type {import('next').NextConfig} */
const appConfig = require('./app.config');

const nextConfig = {
  reactStrictMode: true,
  ...appConfig
}

module.exports = nextConfig
