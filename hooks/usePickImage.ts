import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';


export default function usePickImage() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    // 這是處理選擇圖片的函數
    const pickImage = async () => {
        // 檢查權限
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('需要圖片庫的權限來選擇照片!');
            return;
        }

        // 開啟圖片選擇器
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return {
        imageUri, setImageUri,
        pickImage,
    };
}


