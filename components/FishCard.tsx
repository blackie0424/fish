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
                contentFit="contain"
            />
            <View style={styles.nameView}>
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </View >
    );
}

const deviceWidth = Math.round(Dimensions.get("window").width);
const imageWidth = deviceWidth - 10; // 左右留白 10
const imageHeight = imageWidth * (9 / 16); // 根據 16:9 比例計算高度
const nameViewHeight = 30; // 名稱欄高度
const cardHeight = imageHeight + nameViewHeight; // 卡片高度 = 圖片高度 + 名稱欄高度

const styles = StyleSheet.create({
    cardView: {
        width: deviceWidth - 10,
        height: cardHeight, // 動態高度
        borderRadius: 20,
        backgroundColor: "#E5C29F",
        alignItems: "center",
        margin: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: imageWidth,
        height: imageHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        alignContent: "center",
        textAlign: "center",
        lineHeight: 30,
        fontSize: 26,
        color: "#000",
    },
    nameView: {
        width: deviceWidth - 10,
        height: nameViewHeight,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        top: imageHeight, // 動態設置 top，緊貼圖片底部
        opacity: 0.8,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});
