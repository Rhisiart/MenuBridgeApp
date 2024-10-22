import { useEffect, useState } from "react";
import { View } from "react-native";

interface IProps {

}

const Menu: React.FC<IProps> = () => {
    const [menus, setMenus] = useState<string[]>();

    useEffect(() => {
        
    }, []) 


    return(
        <View>
        </View>
    )
}

export default Menu