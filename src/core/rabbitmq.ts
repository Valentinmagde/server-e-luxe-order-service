import amqplib from "amqplib";
import config from "../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-07-23
 *
 * Class RabbitmqManager
 *
 */
class RabbitmqManager {
  public channel: any;

  /**
   * Create channel
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-23
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async createChannel(): Promise<void> {
    const conn = await amqplib.connect(
      `amqp://${config.rabbitmqDbUser}:${config.rabbitmqDbPassword}@${config.rabbitmqDbHost}`,
      { clientProperties: { connection_name: "payment-service" } }
    );

    this.channel = await conn.createChannel();
  }

  /**
   * Publish message
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-23
   *
   * @param {string} exchangeName the routing key
   * @param {any} routingKey the routing key
   * @param {any} message the message to publish
   * @return {Promise<any>} the eventual completion or failure
   */
  public async publishMessage(
    exchangeName: string,
    routingKey: any,
    message: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          if (!this.channel) await this.createChannel();

          const logDetails = {
            logType: routingKey,
            message,
            dateTime: new Date(),
          };

          await this.channel.assertExchange(exchangeName, "direct");
          const publishResult = await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
          );
          console.log(
            `The message ${message} is send to exchange ${exchangeName}`
          );
          resolve(publishResult);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Consume message
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-23
   *
   * @param {string} exchangeName the routing key
   * @param {string} routingKey the routing key
   * @param {string} queueName the queue name
   * @return {Promise<any>} the eventual completion or failure
   */
  public async consumeMessage(
    exchangeName: string,
    routingKey: string,
    queueName: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          if (!this.channel) await this.createChannel();

          await this.channel.assertExchange(exchangeName, "direct");

          const q = await this.channel.assertQueue(queueName);

          await this.channel.bindQueue(q.queue, exchangeName, routingKey);

          this.channel.consume(q.queue, (msg: any) => {
            const data = JSON.parse(msg.content);
            console.log(data);
            this.channel.ack(msg);
          });

          resolve(q);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Connect to rabbitmq
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-23
   *
   * @return {Promise<any>} the eventual completion or failure
   */
  public async connectToRabbitmq(): Promise<any> {
    return new Promise<any>((resolve) => {
      (async () => {
        const conn = await amqplib.connect(
          `amqp://${config.rabbitmqDbUser}:${config.rabbitmqDbPassword}@${config.rabbitmqDbHost}`,
          { clientProperties: { connection_name: "payment-service" } }
        );

        resolve(conn);
      })();
    });
  }

  /**
   * Sets up a RabbitMQ queue by asserting an exchange, queue, and routing key,
   * and binds the queue to the exchange for message routing.
   *
   * @param {string} exchangeName - The name of the RabbitMQ exchange to assert or use.
   * @param {string} queueName - The name of the RabbitMQ queue to assert or use.
   * @param {string} routingKey - The routing key to bind the queue to the exchange.
   *
   * @throws {Error} If RabbitMQ channel creation or queue setup fails.
   *
   * @return {Promise<{ channel: any, queue: string }>} Resolves with an object containing
   * the RabbitMQ channel and the name of the asserted queue.
   */
  public async setupQueue(
    exchangeName: string,
    queueName: string,
    routingKey: string
  ): Promise<{ channel: any; queue: string }> {
    await rabbitmqManager.createChannel();
    const channel = rabbitmqManager.channel;
    await channel.assertExchange(exchangeName, "direct");
    const q = await channel.assertQueue(queueName);
    await channel.bindQueue(q.queue, exchangeName, routingKey);
    return { channel, queue: q.queue };
  }
}

const rabbitmqManager = new RabbitmqManager();
export default rabbitmqManager;
