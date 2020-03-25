import { createContext } from "react";
import socketIOClinet from "socket.io-client";

const socket = socketIOClinet(process.env.REACT_APP_WS_SERVER);

export const SocketContext = createContext(socket);