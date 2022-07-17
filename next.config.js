// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// eslint-disable-next-line no-undef
module.exports = (pahse) => {
  /** @type {import('next').NextConfig} */

  if (pahse === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: 'user_1',
        mongodb_password: 'paYVUUKka0ymKfp5',
        mongodb_claster: 'learningcluster',
        mongodb_database: 'finalProject-dev',
      },
    };
  }
  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: 'user_1',
      mongodb_password: 'paYVUUKka0ymKfp5',
      mongodb_claster: 'learningcluster',
      mongodb_database: 'finalProject',
    },
  };
};
