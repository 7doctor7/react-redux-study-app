export const envConstants = {
  dev: {
    API_URL: `http://0.0.0.0:9000${process.env.API_ROOT}`,
    MASTER_KEY: process.env.MASTER_KEY,
    DEBUG: false
  },
  prod: {
    API_URL: `${process.env.HEROKU_URL}:${process.env.PORT}${process.env.API_ROOT}`,
    MASTER_KEY: process.env.MASTER_KEY
  }
};
