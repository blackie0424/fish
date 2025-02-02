// Loading.tsx (通用載入元件)
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingProps {
    size?: "small" | "large";
    color?: string;
    backgroundColor?: string;
}

export function Loading({ size = "large", color = "#ffffff", backgroundColor = "rgba(0, 0, 0, 0.5)" }: LoadingProps) {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});