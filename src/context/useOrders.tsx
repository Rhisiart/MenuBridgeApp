import { Buffer } from "buffer";
import { createContext, useContext, useEffect, useState } from "react";
import { Commands } from "../types/enum";
import { IOrder } from "../types/interface";
import { useWebSocket } from "./useWebSocket";

interface IProps {
    children: React.ReactNode
}

const OrdersContext = createContext<IOrder[]>([]);

const OrdersProvider: React.FC<IProps> = ({children}) => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    const ws = useWebSocket();

    useEffect(() => {
        if(!ws) {
            return;
        }

        ws.eventListener.addEvent("Order", (data: Uint8Array) => {
            const str = Buffer.from(data).toString("utf-8");
            const ordersParsed: IOrder[] = JSON.parse(str);

            setOrders(ordersParsed);
        });

        ws.send(Commands.Order, 1, new Uint8Array(1));

        return () => {
            ws.eventListener.removeEvent("Order");
        }
    }, [ws]);

    return (
        <OrdersContext.Provider value={orders}>
            {children}
        </OrdersContext.Provider>
    )
}

export const useOrders = () => useContext(OrdersContext);
export default OrdersProvider;