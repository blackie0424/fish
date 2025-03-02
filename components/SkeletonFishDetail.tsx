import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get("window").width);

const SkeletonFishDetail = () => (
    <View style={styles.container} testID="skeleton-fish-detail">
        {/* 模仿 FishCard */}
        <View>
            <View style={styles.skeletonCard}>
                <View style={styles.skeletonImage} />
                <View style={styles.skeletonName} />
                <View style={styles.skeletonCategory} />
            </View>
        </View>
        {/* 模仿 advanceView */}
        <View style={styles.skeletonAdvanceView}>
            <View style={styles.skeletonDescriptionView} />
            <View style={styles.skeletonDescriptionView} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003F5E",
        top: -60
    },
    skeletonCard: {
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
        height: 160,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    skeletonName: {
        minWidth: 80,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 50,
        position: "absolute",
        left: 10,
        top: 170,
    },
    skeletonCategory: {
        width: 70,
        height: 40,
        backgroundColor: '#ccc',
        borderRadius: 50,
        position: "absolute",
        right: 10,
        top: 170,
    },
    skeletonAdvanceView: {
        width: deviceWidth - 10,
        height: 300,
        margin: 10,
        padding: 10,
        backgroundColor: "#E5C29F",
        borderRadius: 20,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    skeletonDescriptionView: {
        width: 200,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#ccc',
        marginBottom: 100,
    }
});

export default SkeletonFishDetail;