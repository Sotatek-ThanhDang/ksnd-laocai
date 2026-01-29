import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type UseWebSocketOptions,
  type UseWebSocketReturn,
  WebSocketReadyState,
  type WebSocketStatus,
} from '../types/websocket';

/**
 * Custom hook for managing WebSocket connections
 *
 * @example
 * ```tsx
 * const { status, sendMessage, lastMessage } = useWebSocket({
 *   url: 'wss://api.example.com/ws',
 *   autoConnect: true,
 *   handlers: {
 *     onMessage: (message) => {
 *       console.log('Received:', message);
 *     },
 *   },
 * });
 * ```
 */
export function useWebSocket<TMessage = unknown>(
  options: UseWebSocketOptions<TMessage>
): UseWebSocketReturn<TMessage> {
  const {
    url,
    autoConnect = true,
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    parseMessage = JSON.parse,
    serializeMessage = JSON.stringify,
    handlers,
  } = options;

  // State
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [readyState, setReadyState] = useState<WebSocketReadyState>(
    WebSocketReadyState.CLOSED
  );
  const [lastMessage, setLastMessage] = useState<TMessage | null>(null);
  const [lastError, setLastError] = useState<Event | null>(null);

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isManualDisconnectRef = useRef(false);

  /**
   * Connect to WebSocket
   */
  const connect = useCallback(() => {
    if (!url) {
      console.warn('WebSocket URL is not provided');
      return;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Clear reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    isManualDisconnectRef.current = false;
    setStatus('connecting');
    setLastError(null);

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = (event) => {
        setStatus('connected');
        setReadyState(WebSocketReadyState.OPEN);
        reconnectAttemptsRef.current = 0;
        handlers?.onOpen?.(event);
      };

      ws.onmessage = (event) => {
        try {
          const message = parseMessage(event.data) as TMessage;
          setLastMessage(message);
          handlers?.onMessage?.(message, event);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (event) => {
        setStatus('error');
        setLastError(event);
        handlers?.onError?.(event);
      };

      ws.onclose = (event) => {
        setStatus('disconnected');
        setReadyState(WebSocketReadyState.CLOSED);
        handlers?.onClose?.(event);

        // Attempt reconnection if not manual disconnect
        if (!isManualDisconnectRef.current && autoReconnect) {
          if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            reconnectAttemptsRef.current += 1;
            setStatus('reconnecting');
            handlers?.onReconnect?.(reconnectAttemptsRef.current);

            reconnectTimeoutRef.current = setTimeout(() => {
              if (url) {
                connect();
              }
            }, reconnectInterval);
          } else {
            setStatus('error');
            handlers?.onReconnectFailed?.();
          }
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setStatus('error');
      if (
        autoReconnect &&
        reconnectAttemptsRef.current < maxReconnectAttempts
      ) {
        reconnectAttemptsRef.current += 1;
        reconnectTimeoutRef.current = setTimeout(() => {
          if (url) {
            connect();
          }
        }, reconnectInterval);
      }
    }
  }, [
    url,
    autoReconnect,
    reconnectInterval,
    maxReconnectAttempts,
    parseMessage,
    handlers,
  ]);

  /**
   * Disconnect from WebSocket
   */
  const disconnect = useCallback(() => {
    isManualDisconnectRef.current = true;
    reconnectAttemptsRef.current = 0;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setStatus('disconnected');
    setReadyState(WebSocketReadyState.CLOSED);
  }, []);

  /**
   * Reconnect to WebSocket
   */
  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttemptsRef.current = 0;
    setTimeout(() => {
      if (url) {
        connect();
      }
    }, 100);
  }, [disconnect, connect, url]);

  /**
   * Send a message through WebSocket
   */
  const sendMessage = useCallback(
    (message: unknown): boolean => {
      if (
        !wsRef.current ||
        wsRef.current.readyState !== WebSocketReadyState.OPEN
      ) {
        console.warn('WebSocket is not connected');
        return false;
      }

      try {
        const serialized = serializeMessage(message);
        wsRef.current.send(serialized);
        return true;
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
        return false;
      }
    },
    [serializeMessage]
  );

  // Auto-connect on mount
  useEffect(() => {
    if (!autoConnect || !url) return;
    connect();

    return () => {
      disconnect();
    };
  }, [autoConnect, url, connect, disconnect]);

  const isConnected =
    status === 'connected' && readyState === WebSocketReadyState.OPEN;

  return {
    status,
    readyState,
    lastMessage,
    lastError,
    isConnected,
    sendMessage,
    connect,
    disconnect,
    reconnect,
  };
}
