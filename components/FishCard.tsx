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
                <Text style={[styles.text, styles.locateText,]}>{props.locate}</Text>
            </View>
            <View style={props.type === "rahet" ? styles.rahetView : styles.oyodView}>
                <Text style={[styles.text, styles.categoryText]}>{props.type}</Text>
            </View>
            <View style={styles.processView}>
                <Text style={[styles.text, styles.processText]}>jingisisi</Text>
            </View>
        </View>
    );
}

const deviceWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
    cardView: {
        width: deviceWidth - 10,
        height: 290,
        borderRadius: 20,
        backgroundColor: "#E5C29F",
        alignItems: "center",
        margin: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: deviceWidth - 10,
        height: 180,
        resizeMode: "cover",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 40,
        fontSize: 26,
        color: "#000",
    },
    nameView: {
        width: deviceWidth - 10,
        height: 40,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: 180,
        opacity: 0.8,
    },
    locateView: {
        width: 120,
        height: 40,
        backgroundColor: "#FFF9F5",
        borderRadius: 50,
        position: "absolute",
        left: 10,
        top: 240,
        opacity: 0.9,
    },
    locateText: {
        fontSize: 20,
    },
    rahetView: {
        width: 70,
        height: 40,
        backgroundColor: "#AAF8F5",
        borderRadius: 50,
        position: "absolute",
        left: 140,
        top: 240,
        opacity: 0.9,
    },
    oyodView: {
        width: 70,
        height: 40,
        backgroundColor: "#FFD1DC",
        borderRadius: 50,
        position: "absolute",
        left: 140,
        top: 240,
        opacity: 0.9,
    },
    categoryText: {
        fontSize: 20,
    },
    processView: {
        width: 90,
        height: 40,
        backgroundColor: "#CCC1DC",
        borderRadius: 50,
        position: "absolute",
        left: 220,
        top: 240,
        opacity: 0.9,
    },
    processText: {
        fontSize: 20,
    },
});
