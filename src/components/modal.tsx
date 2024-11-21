import { FC, ReactNode, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Portal } from "./portal";

const { height } = Dimensions.get('window')

interface IProps {
    visible: boolean,
    children: ReactNode,
    onClose: () => void,
}

const Modal: FC<IProps> = ({ visible, children, onClose }) => {
    const opacity = useSharedValue(0);
    const container = useSharedValue(height);
    const modal = useSharedValue(height);
    const threshold = height / 3;
    const tap = Gesture.Tap().onEnd((event) => {
        runOnJS(onClose)();
    })
    const pan = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationY > 0) {
                modal.value = event.translationY;
            }
        })
        .onEnd((event) => {
            if (event.translationY > threshold) {
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
        transform: [{ translateY: container.value }],
    }));

    const modalStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: modal.value }],
    }));

    const openModal = () => {
        //???need to be in sequence
        container.value = withTiming(0, { duration: 100, reduceMotion: ReduceMotion.System }, () => {
            opacity.value = withTiming(1, { duration: 300, reduceMotion: ReduceMotion.System });
            modal.value = withSpring(0, {
                damping: 20,
                stiffness: 100,
                reduceMotion: ReduceMotion.System
            });
        });
    }

    const closeModal = () => {
        //???need to be in sequence
        modal.value = withSpring(height, {
            damping: 20,
            stiffness: 100,
            reduceMotion: ReduceMotion.System
        });
        opacity.value = withTiming(0, { duration: 300, reduceMotion: ReduceMotion.System });
        container.value = withTiming(height, { duration: 100, reduceMotion: ReduceMotion.System });
    }

    useEffect(() => {
        visible ? openModal() : closeModal();
    }, [visible])

    return (
        <Portal id="model">
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.container, containerStyle]}>
                    <Animated.View style={[styles.modal, modalStyle]}>
                        <View style={styles.indicator} />
                        <View className="w-full mt-10">{children}</View>
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        zIndex: 1
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
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
    },
})

export default Modal