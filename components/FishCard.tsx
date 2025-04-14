import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

import { Loading } from "./Loading";
import { Image as ExpoImage } from "expo-image";


interface FishCardProps {
    id: number;
    name: string;
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
        </View >
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
});
