import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



export default function usePickImage() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


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

    // 將圖片複製到持久化目錄
    const persistImage = async (imageUri: string) => {
        const filename = imageUri.split('/').pop() || 'default.png'; // 確保有預設檔名
        const persistentUri = `${FileSystem.documentDirectory}${filename}`;


        try {
            throw (new Error("test error box"));

            await FileSystem.copyAsync({
                from: imageUri,
                to: persistentUri,
            });
            console.log('Image copied to persistent URI:', persistentUri);
            return persistentUri;
        } catch (error) {
            setError('Error copying image in usePickImages:' + error);
            return imageUri; // 如果複製失敗，退回原始 URI
        }
    };

    return {
        imageUri, setImageUri,
        error,
        pickImage, persistImage
    };
}


