declare module '@stomp/stompjs' {
  export interface StompHeaders {
    [key: string]: string;
  }

  export interface IMessage {
    command: string;
    headers: StompHeaders;
    body: string;
    ack: () => void;
    nack: () => void;
  }

  export interface StompSubscription {
    id: string;
    unsubscribe: () => void;
  }

  export interface IFrame {
    command: string;
    headers: StompHeaders;
    body: string;
  }

  export interface ClientConfig {
    brokerURL?: string;
    reconnectDelay?: number;
    connectHeaders?: StompHeaders;
    debug?: (msg: string) => void;
    onConnect?: (frame: IFrame) => void;
    onDisconnect?: (frame: IFrame) => void;
    onStompError?: (frame: IFrame) => void;
  }

  export class Client {
    constructor(config?: ClientConfig);

    active: boolean;
    onConnect?: (frame: IFrame) => void;
    onDisconnect?: (frame: IFrame) => void;
    onStompError?: (frame: IFrame) => void;

    activate(): void;
    deactivate(): void;

    async subscribe(
      destination: string,
      callback: (message: IMessage) => void
    ): Promise<StompSubscription>;

    publish(params: {
      destination: string;
      body: string;
      headers?: StompHeaders;
    }): void;
  }
}
