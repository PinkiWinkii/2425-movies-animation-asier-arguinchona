import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

interface SpinnerProps {
    size?: 'small' | 'large'; // Optional prop to define the spinner size
    color?: string; // Optional prop to define the spinner color
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'large', color = '#0000ff' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Spinner;
