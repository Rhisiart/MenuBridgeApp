import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useOrders } from '../context/useOrders';
import Modal from './modal';
import OrdersList from './ordersList';

interface IProps {
    title: string,
    hasDivider: boolean,
}

const Header: FC<IProps> = ({title, hasDivider}) => {
    const [showOrders, setShowOrders] = useState(false);

    const orders = useOrders();

    const onCloseModel = () => {
        setShowOrders(show => !show)
    }

    return (
        <View className="pt-6 pb-6 bg-white">
            <View className="flex-row justify-between items-center px-4">
                <MaterialCommunityIcons name="account" size={24} color="black" />
                <Text className="text-2xl font-bold ">{title}</Text>
                <TouchableOpacity onPress={onCloseModel}>
                    <FontAwesome5 name="calendar-alt" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Modal 
                position='vertical'
                visible={showOrders} 
                onClose={onCloseModel}
            >
                {orders.length > 0 ? 
                    <OrdersList orders={orders}/>
                    :
                    <Text>Not orders for today yet!</Text>
                }
            </Modal>
        </View>
    )
}

export default Header;