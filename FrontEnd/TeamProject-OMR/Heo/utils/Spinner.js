import { useEffect, useRef } from "react";
import { View, Text, Animated, ActivityIndicator, StyleSheet } from "react-native";

const LoadingSpinner = () => {
    const spinValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );

        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        spinAnimation.start();
        scaleAnimation.start();

        return () => {
            spinAnimation.stop();
            scaleAnimation.stop();
        };
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loadingBackground}>
                <Animated.View
                    style={[
                        styles.spinnerContainer,
                        {
                            transform: [
                                { rotate: spin },
                                { scale: scaleValue }
                            ],
                        },
                    ]}
                >
                    <View style={styles.outerRing} />
                    <View style={styles.innerRing} />
                    <View style={styles.centerDot} />
                </Animated.View>
                <Text style={styles.loadingText}>예고편을 불러오는 중...</Text>
                <View style={styles.loadingDots}>
                    <ActivityIndicator size="small" color="#007bff" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingBackground: {
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    spinnerContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    outerRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#007bff',
        borderTopColor: 'transparent',
    },
    innerRing: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#28a745',
        borderBottomColor: 'transparent',
    },
    centerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007bff',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    loadingDots: {
        marginTop: 10,
    },
});

export default LoadingSpinner;