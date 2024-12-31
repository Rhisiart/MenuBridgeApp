import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { usePortal } from '../context/usePortal';
import OrdersList from './ordersList';

interface IProps {
    title: string,
    isStack: boolean,
    hasDivider: boolean,
}

const Header: FC<IProps> = ({title, isStack, hasDivider}) => {
    const route = useRouter();
    const { render } = usePortal();

    const onPressOrdersButton = () => {
        const element = (
            <View>
                <OrdersList />
            </View>
        )

        render({
            position: "vertical", 
            nodes: element
          });
    }

    const onClickBack = () => {
        const canGoback = route.canGoBack();

        if(canGoback) {
            route.back();
        } else {
            //show a toast notification or something
            console.log("Cannot go back!");
        }
    }

    return (
        <View className="pt-6 pb-6 bg-white">
            <View className="flex-row justify-between items-center px-4">
                <View>
                {
                    isStack 
                    ? <TouchableOpacity onPress={onClickBack}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    : <MaterialCommunityIcons name="account" size={24} color="black" />
                }    
                </View>
                <Text className="text-xl font-semibold">{title}</Text>
                <TouchableOpacity onPress={onPressOrdersButton}>
                    <FontAwesome5 name="calendar-alt" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header;