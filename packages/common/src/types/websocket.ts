/**
 * WebSocket connection states
 * Values match WebSocket.readyState constants
 */
export enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

/**
 * WebSocket connection status for UI
 */
export type WebSocketStatus =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'reconnecting';

/**
 * WebSocket event handlers
 */
export type WebSocketEventHandlers<TMessage = unknown> = {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (message: TMessage, event: MessageEvent) => void;
  onReconnect?: (attempt: number) => void;
  onReconnectFailed?: () => void;
};

/**
 * WebSocket configuration options
 */
export type UseWebSocketOptions<TMessage = unknown> = {
  /** WebSocket server URL */
  url: string | null;
  /** Whether to automatically connect on mount */
  autoConnect?: boolean;
  /** Whether to automatically reconnect on disconnect */
  autoReconnect?: boolean;
  /** Maximum number of reconnection attempts */
  maxReconnectAttempts?: number;
  /** Delay for reconnection in milliseconds */
  reconnectInterval?: number;
  /** Custom message parser (default: JSON.parse) */
  parseMessage?: (data: string) => TMessage;
  /** Custom message serializer (default: JSON.stringify) */
  serializeMessage?: (message: unknown) => string;
  /** Event handlers */
  handlers?: WebSocketEventHandlers<TMessage>;
};

/**
 * WebSocket hook return type
 */
export type UseWebSocketReturn<TMessage = unknown> = {
  /** Current connection status */
  status: WebSocketStatus;
  /** WebSocket ready state */
  readyState: WebSocketReadyState;
  /** Last received message */
  lastMessage: TMessage | null;
  /** Last error event */
  lastError: Event | null;
  /** Whether the WebSocket is connected */
  isConnected: boolean;
  /** Send a message through the WebSocket */
  sendMessage: (message: unknown) => boolean;
  /** Connect to the WebSocket */
  connect: () => void;
  /** Disconnect from the WebSocket */
  disconnect: () => void;
  /** Reconnect to the WebSocket */
  reconnect: () => void;
};
