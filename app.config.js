module.exports = {
  serverRuntimeConfig: {
    staticRevalidate: 10,
  },
  publicRuntimeConfig: {
    apiBaseURL: process.env.BASE_URL,
  },
};
