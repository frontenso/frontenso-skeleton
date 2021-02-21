// eslint-disable-next-line
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  PRODUCTION,
  shouldCompressImages: PRODUCTION,
};
