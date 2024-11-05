import { FC } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ITab } from "../types/interface";

interface IProps {
    items: ITab[],
    tabSelected: ITab,
    onSelected: (tabSelected: ITab) => void,
}

const Tabbar: FC<IProps> = ({items, tabSelected, onSelected}) => {
    const renderItem = (itemInfo: ListRenderItemInfo<ITab>) => (
        <TouchableOpacity
            onPress={() => onSelected(itemInfo.item)}
            style={[
                styles.button,
                tabSelected && tabSelected.id === itemInfo.item.id && styles.selectedButton,
            ]}
        >
            <Text 
                style={tabSelected && tabSelected.id === itemInfo.item.id 
                ? styles.selectedText 
                : styles.text}
            >
                {itemInfo.item.name}
            </Text>
        </TouchableOpacity>
    );


    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
        />
    )
}

const styles = StyleSheet.create({
    carousel: {
        paddingHorizontal: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    selectedButton: {
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#000',
        borderColor: '#000',
    },
    text: {
        color: '#000',
        fontSize: 12,
    },
    selectedText: {
        color: '#fff',
    },
});

export default Tabbar;