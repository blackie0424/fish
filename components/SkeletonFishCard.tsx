import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get("window").width);

const SkeletonFishCard = () => (
    <View style={styles.cardView} testID="skeleton-card">
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonNameView} />
        <View style={styles.skeletonLocateView} />
        <View style={styles.skeletonCategoryView} />
    </View>
);

const styles = StyleSheet.create({
    cardView: {
        width: deviceWidth - 10,
        height: 220,
        borderRadius: 20,
        backgroundColor: '#E5C29F', // 與 FishCard 一致
        alignItems: "center",
        margin: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    skeletonImage: {
        width: deviceWidth - 10,
        height: 160,
        backgroundColor: '#ddd', // 素色填充
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    skeletonNameView: {
        minWidth: 80,
        height: 40,
        backgroundColor: '#ccc', // 略淡於圖片
        borderRadius: 50,
        position: "absolute",
        left: 10,
        top: 170,
    },
    skeletonLocateView: {
        width: 80,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 50,
        position: "absolute",
        right: 85,
        top: 170,
    },
    skeletonCategoryView: {
        width: 70,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 50,
        position: "absolute",
        right: 10,
        top: 170,
    },
});

export default SkeletonFishCard;