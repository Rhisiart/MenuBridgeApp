import { useGlobalSearchParams } from "expo-router";
import { FC } from "react";
import Header from "./header";

type Params = {
    id: string,
    tableNumber: string,
    order: string,
}

const TableScreenHeader: FC = () => {
    const { id, order, tableNumber } = useGlobalSearchParams<Params>();

    return (
        <Header title={`Manager order (${id})`} isStack hasDivider={false} />
    )
}

export default TableScreenHeader;