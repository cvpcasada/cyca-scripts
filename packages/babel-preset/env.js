const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const isEnvDevelopment = env === "development";
const isEnvProduction = env === "production";
const isEnvTest = env === "test";

module.exports = {
  env,
  isEnvDevelopment,
  isEnvProduction,
  isEnvTest
}