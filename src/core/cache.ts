import { RedisClientType, createClient } from "redis";
import i18n from "./i18n";
import config from "../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 *
 * Class CacheManager
 *
 */
class CacheManager {
  /**
   * Connect to redis storage
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   *
   * @return {Promise<RedisClientType>} the eventual completion or failure
   */
  public async connectToRedis(): Promise<RedisClientType> {
    return new Promise<RedisClientType>((resolve, reject) => {
      (async () => {
        const client: RedisClientType = createClient({
          url: `redis://${config.redisDbHost}:${config.redisDbPort}`,
        });

        client.on("error", () => {
          reject(
            `${i18n.__("config.cache.redis.redisConnectionTo")} ${
              config.redisDbHost
            }:${config.redisDbPort} ${i18n.__("config.cache.redis.failed")}`
          );
        });

        await client.connect();

        resolve(client);
      })();
    });
  }
}

const cacheManager = new CacheManager();
export default cacheManager;