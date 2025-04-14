import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get("window").width);

const SkeletonFishCard = () => (
    <View style={styles.cardView} testID="skeleton-card">
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonNameView} />
    </View>
);

const styles = StyleSheet.create({
    cardView: {
        width: deviceWidth - 10,
        height: 220,
        borderRadius: 20,
        backgroundColor: "#E5C29F",
        alignItems: "center",
        margin: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    skeletonImage: {
        width: deviceWidth - 10,
        height: 180,
        resizeMode: "cover",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    skeletonNameView: {
        width: deviceWidth - 10,
        height: 40,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: 180,
        opacity: 0.8,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    }
});

export default SkeletonFishCard;