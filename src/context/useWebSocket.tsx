import Manager from "@/src/service/manager";
import { createContext, useContext, useEffect, useState } from "react";

interface IProps {
    url: string,
    children: React.ReactNode,
}

const WebSocketContext = createContext<Manager | undefined>(undefined);

const WebSocketProvider: React.FC<IProps> = ({ url, children}) => {
    const [manager, setManager] = useState<Manager>();

    useEffect(() => {
        const mngr = Manager.getInstance(url);

        setManager(mngr);
    }, [url]);

    return (
        <WebSocketContext.Provider value={manager}>
            {children}
        </ WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext);
export default WebSocketProvider;