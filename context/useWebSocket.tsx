import Manager from "@/service/manager";
import Parser from "@/service/parser";
import { createContext, useContext } from "react";

interface IProps {
    url: string,
    children: React.ReactNode
}

const WebSocketContext = createContext<Manager>({} as Manager);

const WebSocketProvider: React.FC<IProps> = ({ url, children}) => {
    return (
        <WebSocketContext.Provider value={Manager.getInstance(url, new Parser())}>
            {children}
        </ WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext)
export default WebSocketProvider;