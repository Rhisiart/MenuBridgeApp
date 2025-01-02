import { createContext, useContext, useState } from "react";
import Modal from "../components/modal";
import { position } from "../types/types";

type ModalProps = {
    position: position,
    nodes: React.JSX.Element | null
}

interface IProps {
    children: React.ReactNode,
}
interface IPortalContext {
    render: (modalProps: ModalProps) => void,
    close: () => void,
}

const PortalContext = createContext<IPortalContext>({
    render: () => {},
    close: () => {},
});

const PortalProvider: React.FC<IProps> = ({children}) => {
    const [show, setShow] = useState<boolean>(false);
    const [modalProps, setModalProps] = useState<ModalProps>({nodes: null , position: "vertical"});

    const render = (modalProps: ModalProps) => {
        setModalProps(modalProps);
        setShow(true);
    };

    const close = () => {
        setShow(visible => !visible);
    };

    return (
        <PortalContext.Provider value={{ render, close }}>
            {children}
            <Modal
                position={modalProps.position}
                visible={show}
                onClose={close}
            >
                {modalProps.nodes}
            </Modal>
        </PortalContext.Provider>
    );
}

export const usePortal = () => useContext(PortalContext);
export default PortalProvider;