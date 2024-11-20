import { createContext, ReactNode, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

interface IProps {
    children: React.ReactNode
}
interface IPortalContext {
    render: (key: string, element: ReactNode) => void;
    remove: (key: string) => void;
}

interface IElement {
    [key: string]: ReactNode
}

const PortalContext = createContext<IPortalContext>({
    render: () => {},
    remove: () => {},
});

const PortalProvider: React.FC<IProps> = ({children}) => {
    const [elements, setElements] = useState<IElement>({});

    const render = (key: string, element: ReactNode) => {
        setElements(prev => ({...prev, [key]: element}));
    };

    const remove = (key: string) => {
        setElements(prev => {
            const { [key]: _, ...rest } = prev;

            return rest;
        });
    };

    return (
        <PortalContext.Provider value={{ render, remove }}>
            {children}
            <View style={styles.container} pointerEvents="box-none">
            {Object.values(elements).map((element, index) => (
                <View key={index} style={StyleSheet.absoluteFill}>
                    {element}
                </View>
            ))}
        </View>
        </PortalContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: 'box-none',
    },
});

export const usePortal = () => useContext(PortalContext)
export default PortalProvider;