import { FC, ReactNode, useEffect } from 'react';
import { usePortal } from '../context/usePortal';


interface PortalProps {
    id: string,
    children: ReactNode,
}

export const Portal: FC<PortalProps> = ({ id, children }) => {
    const { render, remove } = usePortal();

    useEffect(() => {
        render(id, children);

        return () => remove(id);
    }, [id, children]);

    return null;
};