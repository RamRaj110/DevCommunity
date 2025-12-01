import io from 'socket.io-client';
import { BASE_URL } from './constants.js';

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL, { withCredentials: true }); 
  } else {
    // same-origin with backend proxied at /api
    return io(window.location.origin, {
      path: "/socket.io/",
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
}