import { FC, ReactNode, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { position } from "../types/types";

interface IProps {
    visible: boolean,
    position: position,
    children: ReactNode,
    onClose: () => void,
}

const { width, height } = Dimensions.get('window');

const Modal: FC<IProps> = ({ position, visible, children, onClose }) => {
    const sharedValue = position === "horizontal" ? height : width;
    const threshold = sharedValue / 3;

    const opacity = useSharedValue(0);
    const container = useSharedValue(sharedValue);
    const modal = useSharedValue(sharedValue);

    const tap = Gesture.Tap().onEnd(() => {
        runOnJS(onClose)();
    });

    const pan = Gesture.Pan()
        .onUpdate((event) => {
            const modalValue = position === "horizontal" 
                ? event.translationY 
                : event.translationX;

            if (modalValue > 0) {
                modal.value = modalValue;
            }
        })
        .onEnd((event) => {
            const translationValue = position === "horizontal" 
                ? event.translationY 
                : event.translationX;

            if (translationValue > threshold) {
                runOnJS(onClose)();
            } else {
                modal.value = withSpring(0, {
                    damping: 20,
                    stiffness: 100,
                });
            }
        });

    const containerStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: position === "horizontal" 
            ? [{ translateY: container.value }] 
            : [{ translateX: container.value }],
    }));

    const modalStyle = useAnimatedStyle(() => ({
        transform: position === "horizontal" 
        ? [{ translateY: modal.value }] 
        : [{ translateX: modal.value }],
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        width: position === "horizontal" 
                ? "100%"
                : interpolate(modal.value, [0, width], [width, width]),
        height: position === "horizontal" 
                    ?  interpolate(modal.value, [0, height], [height, height])
                    : "100%",
        backgroundColor: `rgba(0, 0, 0, ${opacity.value * 0.5})`,
    }));

    const openModal = () => {
        container.value = withTiming(0, { duration: 100 }, () => {
            opacity.value = withTiming(1, { duration: 300 });
            modal.value = withSpring(0, {
                damping: 20,
                stiffness: 100,
            });
        });
    };

    const closeModal = () => {
        modal.value = withSpring(sharedValue, {
            damping: 20,
            stiffness: 100,
        });
        opacity.value = withTiming(0, { duration: 300 });
        container.value = withTiming(sharedValue, { duration: 100 });
    };

    useEffect(() => {
        visible ? openModal() : closeModal();
    }, [visible]);

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.overlayContainer, overlayStyle]} />
            </GestureDetector>
            <GestureDetector gesture={pan}>
                <Animated.View style={[
                    styles.modal, 
                    modalStyle,
                    position === "vertical" && styles.panel
                ]}>
                    <View style={styles.indicator} />
                    <View className="w-full mt-10">{children}</View>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    overlayContainer: {
        width: '100%',
    },
    modal: {
        bottom: 0,
        position: 'absolute',
        height: '76%',
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panel: {
        right: 0,
        bottom: 0,
        height: '100%',
        width: '85%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 20,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5,
    },
});

export default Modal;