import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

import SelectionGroup from "@/components/SelectGroup";
import useCreateFish from "@/hooks/useCreateFish";

import { useLocalSearchParams } from "expo-router";
import { useImage } from '@/context/ImageContext';
import useUploadImage from '@/hooks/useUploadImage';
import { useRef } from "react";



export default function CreateFishScreen() {
    const hasUploaded = useRef(false); // 追蹤是否已上傳

    const [isUploading, setIsUploading] = useState(true);
    const params = useLocalSearchParams();
    const { uploadImage } = useUploadImage();
    const {
        fishName, setFishName,
        locate, setSelectedLocation,
        fishType, setSelectedType,
        selectedProcessing, setSelectedProcessing,
        imageName, setImageName,
        handleSubmit,
    } = useCreateFish();

    useEffect(() => {
        if (params.triggerUpload === "true" && !hasUploaded.current) {
            hasUploaded.current = true;
            setIsUploading(true); // 開始上傳，按鈕不可按
            uploadImage().then((res) => {
                setImageName(res || "default.png"); // 確保有值
            }).catch((err) => {
                console.error("圖片上傳失敗", err);
                setImageName("default.png");
            }).finally(() => {
                setIsUploading(false); // 上傳完成，無論成功與否都開啟按鈕
            });
        }
    }, [params]);

    const { imageUriForAll } = useImage();
    const imageUri = String(params.imageUri);
    const locations = ["Imorod", "Iratay", "Yayo", "Iraraley", "Iranmeylek", "Ivalino"];
    const types = ["oyod", "rahet"];
    const processingOptions = ["isisan", "jingisisi", "kolitan"];

    return (
        <View style={styles.container}>

            {/* ✅ 預覽圖片 */}
            {imageUriForAll && <Image source={{ uri: imageUriForAll }} style={styles.preview} />}
            <View style={styles.separator} />
            {/* 魚名稱輸入框 */}
            <Text style={styles.title}>魚類名稱，建議以羅馬拼音書寫</Text>
            <TextInput
                style={styles.input}
                value={fishName}
                onChangeText={setFishName}
                placeholder="ngaran no among"
            />
            <Text style={styles.title}>屬於哪一個部落的文化知識</Text>
            <SelectionGroup options={locations} selected={locate} onSelect={setSelectedLocation} />
            <Text style={styles.title}>oyod kano rahet</Text>
            <SelectionGroup options={types} selected={fishType} onSelect={setSelectedType} />
            <Text style={styles.title}>魚的處理方式</Text>
            <SelectionGroup options={processingOptions} selected={selectedProcessing} onSelect={setSelectedProcessing} />
            {/* 確定按鈕 */}
            <TouchableOpacity
                style={[styles.button, isUploading && { backgroundColor: "#ccc" }]}
                onPress={isUploading ? null : handleSubmit} // 如果 isUploading 為 true，就讓 onPress 變 null
                disabled={isUploading} // 直接使用 disabled 屬性
            >
                <Text style={styles.buttonText}>分享</Text>
            </TouchableOpacity>
        </View>
    );
}

const deviceWidth = Dimensions.get("window").width;

// 樣式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    preview: {
        width: "100%",
        height: 200,
        resizeMode: "contain"
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        marginVertical: 10,
    },
    title: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF", // 藍色
        paddingVertical: 12,
        borderRadius: 18, // 圓角
        alignItems: "center",
        marginBottom: 200,
        width: deviceWidth * 0.8,
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});