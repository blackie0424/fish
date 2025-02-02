import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";

import { Loading } from "./Loading";

interface FishCardProps {
    id: number;
    name: string;
    traditionalName: string;
    category: string;
    imgUri: string;
}

export function FishCard(props: FishCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <View style={styles.cardView}>
            {isImageLoading && <Loading backgroundColor="transparent" color="#ff0000" />}
            <Image
                source={{ uri: props.imgUri }}
                style={styles.image}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
            />
            <View style={styles.nameView}>
                <Text style={styles.text}>{props.traditionalName}</Text>
                <Text style={styles.text}>{props.name}</Text>
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
        height: 210,
        borderRadius: 20,
        backgroundColor: "#E5C29F",
        alignItems: "center",
        margin: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: deviceWidth - 10,
        height: 136,
        resizeMode: "contain",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        fontSize: 18,
        paddingBottom: 5,
    },
    nameView: {
        position: "absolute",
        left: 10,
        top: 150,
    },
    categoryView: {
        width: 80,
        height: 40,
        backgroundColor: "#FAF8F5",
        borderRadius: 50,
        position: "absolute",
        right: 10,
        top: 150,
        opacity: 0.9,
    },
    categoryText: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 40,
    },
});
