import dotenv from "dotenv";

dotenv.config();

const prod = {
  // Environment
  env: process.env.NODE_ENV || "production",

  // Server config
  nodeServerPort: process.env.NODE_SERVER_PORT || 2300,
  nodeServerHost: process.env.NODE_SERVER_HOST || "localhost",
  nodeServerPublicKey: process.env.NODE_SERVER_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),

  // API GATEWAY URL
  apiGatewayUrl: process.env.API_GATEWAY_URL || "https://api.e-luxe.fr",

  // Redis db
  redisDbPort: process.env.REDIS_DB_PORT || 6379,
  redisDbHost: process.env.REDIS_DB_HOST || "127.0.0.1",
  redisDbUser: process.env.REDIS_DB_USER || "e_luxe",
  redisDbPassword: process.env.REDIS_DB_PASSWORD || "e_luxe2024!",
  redisDbName: process.env.REDIS_DB_NAME || "redis",

  // Mongo db
  mongoDbHost: process.env.MONGODB_DB_HOST || "127.0.0.1",
  mongoDbPort: process.env.MONGODB_DB_PORT || "27017",
  mongoDbUser: process.env.MONGODB_DB_USER || "e_luxe",
  mongoDbPassword: process.env.MONGODB_DB_PASSWORD || "e_luxe2024!",
  mongoDbName: process.env.MONGODB_DB_NAME || "el_orders_db",

  // Rabbitmq db
  rabbitmqDbHost: process.env.RABBITMQ_DB_HOST || "127.0.0.1",
  rabbitmqDbPort: process.env.RABBITMQ_DB_PORT || "27017",
  rabbitmqDbUser: process.env.RABBITMQ_DB_USER || "e_luxe",
  rabbitmqDbPassword: process.env.RABBITMQ_DB_PASSWORD || "e_luxe2024!",
  rabbitmqDbName: process.env.RABBITMQ_DB_NAME || "el_orders_db",

  // Swagger documentation
  swaggerBaseUrl: process.env.SWAGGER_BASE_URL || "/v1/orders/docs",
};

export default prod;