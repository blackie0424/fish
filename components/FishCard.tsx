import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

import { Loading } from "./Loading";
import { Image as ExpoImage } from "expo-image";


interface FishCardProps {
    id: number;
    name: string;
    category: string;
    imgUri: string;
}

export function FishCard(props: FishCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <View style={styles.cardView}>
            {isImageLoading && <Loading backgroundColor="transparent" color="#ff0000" />}
            <ExpoImage
                source={{ uri: props.imgUri }}
                style={styles.image}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                cachePolicy="disk"
                contentFit="cover"
            />
            <View style={styles.nameView}>
                <Text style={styles.text}>{props.name}</Text>
            </View>
            <View style={styles.locateView}>
                <Text style={[styles.locateText, styles.text]}>Iraraley</Text>
            </View>
            <View style={styles.categoryView}>
                <Text style={[styles.categoryText, styles.text]}>{props.category}</Text>
            </View>
        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get("window").width);

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
    image: {
        width: deviceWidth - 10,
        height: 160,
        resizeMode: "cover",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 40,
    },
    nameView: {
        minWidth: 80,
        height: 40,
        backgroundColor: "#EFF9F5",
        borderRadius: 50,
        position: "absolute",
        left: 10,
        top: 170,
        opacity: 0.9,
    },
    locateView: {
        width: 80,
        height: 40,
        backgroundColor: "#FFF9F5",
        borderRadius: 50,
        position: "absolute",
        right: 85,
        top: 170,
        opacity: 0.9,
    },
    locateText: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 40,
    },
    categoryView: {
        width: 70,
        height: 40,
        backgroundColor: "#AAF8F5",
        borderRadius: 50,
        position: "absolute",
        right: 10,
        top: 170,
        opacity: 0.9,
    },
    categoryText: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 40,
    },
});
