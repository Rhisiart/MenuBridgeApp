import React, { FC, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const { height } = Dimensions.get('window')

interface IProps {
    visible: boolean,
    onClose: () => void,
}

const Modal: FC<IProps> = ({ visible, onClose }) => {
    const opacity = useSharedValue(0);
    const container = useSharedValue(height);
    const modal = useSharedValue(height);
    const threshold = height / 3;
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
        container.value = withTiming(0, { duration: 100, reduceMotion: ReduceMotion.System });
        opacity.value = withTiming(1, { duration: 300, reduceMotion: ReduceMotion.System });
        modal.value = withSpring(0, {
            damping: 20,
            stiffness: 100,
            reduceMotion: ReduceMotion.System
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
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.container, containerStyle]}>
                <Animated.View style={[styles.modal, modalStyle]}>
                    <View style={styles.indicator} />
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae massa odio. Quisque ante sem, tempor eget massa vel, mollis tincidunt metus. Ut sed felis lectus. Nam semper molestie urna, quis ultricies quam semper ut. Maecenas aliquet id urna a convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas leo lectus, dictum vitae erat eget, luctus dapibus sapien. Integer at hendrerit quam. Vivamus tempor, arcu non fringilla laoreet, enim nibh porttitor enim, eget pellentesque eros nulla congue neque. Suspendisse et lobortis enim, nec fermentum est. Aliquam accumsan viverra vehicula. Proin tempus sagittis auctor. Vivamus quam ligula, laoreet eget eros et, hendrerit iaculis risus. Nam a nulla in purus fermentum rhoncus eu et erat. Aliquam tempus felis lorem, id hendrerit tortor vestibulum ac.
                    </Text>
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        zIndex: 2
    },
    modal: {
        bottom: 0,
        position: 'absolute',
        height: '92%',
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 25,
        paddingRight: 25
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 5
    },
    text: {
        marginTop: 50,
        textAlign: 'center'
    }
})

export default Modal