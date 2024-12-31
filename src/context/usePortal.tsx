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
}

const PortalContext = createContext<IPortalContext>({
    render: () => {},
});

const PortalProvider: React.FC<IProps> = ({children}) => {
    const [show, setShow] = useState<boolean>(false);
    const [modalProps, setModalProps] = useState<ModalProps>({nodes: null , position: "vertical"});

    const render = (modalProps: ModalProps) => {
        setModalProps(modalProps);
        setShow(true);
    };

    return (
        <PortalContext.Provider value={{ render }}>
            {children}
            <Modal
                position={modalProps.position}
                visible={show}
                onClose={() => setShow(visible => !visible)}
            >
                {modalProps.nodes}
            </Modal>
        </PortalContext.Provider>
    );
}

export const usePortal = () => useContext(PortalContext);
export default PortalProvider;