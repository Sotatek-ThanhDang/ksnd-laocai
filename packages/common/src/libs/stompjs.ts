import {
  Client,
  type IFrame,
  type IMessage,
  type StompHeaders,
  type StompSubscription,
} from '@stomp/stompjs';

import { delay } from '../utils';

type StompMessageHandler = (message: IMessage) => void;

interface StompSocketClientOptions {
  url: string;
  /**
   * Additional headers that will be sent when connecting.
   */
  connectHeaders?: StompHeaders;
  /**
   * Reconnect delay in milliseconds. Set to 0 to disable automatic reconnect.
   * Default: 5_000ms.
   */
  reconnectDelay?: number;
}

class StompSocketClient {
  private readonly client: Client;
  private connected = false;
  private retryCount = 0;

  constructor(options: StompSocketClientOptions) {
    const { url, connectHeaders, reconnectDelay = 5_0000 } = options;

    this.client = new Client({
      brokerURL: url,
      reconnectDelay,
      connectHeaders,
    });

    this.client.activate();
    this.client.onConnect = () => {
      this.connected = true;
    };

    this.client.onDisconnect = () => {
      this.connected = false;
    };

    this.client.onStompError = (frame: IFrame) => {
      // Let consumer decide how to surface the error; default to console.error

      console.error('STOMP error', frame.headers['message'], frame.body);
    };
  }

  /**
   * Start the underlying STOMP client.
   */
  public connect(): void {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  /**
   * Gracefully disconnect the STOMP client.
   */
  public disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
  }

  /**
   * Subscribe to a STOMP destination.
   */
  public async subscribe(
    destination: string,
    handler: StompMessageHandler
  ): Promise<StompSubscription> {
    if (!this.client.active) {
      await delay(1000);
      this.retryCount++;
      return this.subscribe(destination, handler);
    }

    const stompSubscription = this._subscribe(destination, handler);

    this.retryCount = 0;
    return stompSubscription;
  }

  private _subscribe(destination: string, handler: StompMessageHandler) {
    return this.client.subscribe(destination, handler);
  }

  /**
   * Publish a message to a STOMP destination.
   */
  public publish(
    destination: string,
    body: string,
    headers?: StompHeaders
  ): void {
    this.client.publish({
      destination,
      body,
      headers,
    });
  }

  /**
   * Current connection status.
   */
  public isConnected(): boolean {
    return this.connected;
  }
}

export { StompSocketClient };
