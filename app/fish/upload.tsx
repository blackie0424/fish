import React, { useState, useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';


const ImageUpload = () => {
    const url = "http://tao-among.vercel.app/prefix/api/upload";
    const [imageUri, setImageUri] = useState<string | null>(null);
    const router = useRouter();
    const params = useLocalSearchParams();

    useEffect(() => {
        // 如果從 _layout.tsx 傳來的參數是 "uploadNow"，則自動執行上傳
        if (params.triggerUpload === "true") {
            uploadImage();
        }
    }, [params]);

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

    // 這是上傳圖片的函數
    const uploadImage = async () => {
        if (!imageUri) {
            alert('請先選擇一張圖片!');
            return;
        }

        const uri = imageUri;
        const localUri = uri.replace('file://', ''); // 處理 URI 的問題
        const filename = localUri.split('/').pop(); // 取得檔名

        const formData = new FormData();
        formData.append('image', {
            uri: localUri,
            name: filename,
            type: 'image/jpeg'
        });

        const requestOptions = {
            method: "POST",
            body: formData
        };

        try {
            const response = await fetch(url, requestOptions);
            const responseData = await response.json(); // 解析 JSON
            if (response.ok) {
                alert(`上傳成功，檔案名稱：${responseData.data}`);
                router.push({
                    pathname: "/fish/create",
                    params: { imageName: `${responseData.data}` },
                })
            } else {
                alert(`上傳失敗: ${responseData.message}`);
            }
        } catch (error) {
            console.error(error);
            alert('上傳過程中發生錯誤');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            <Button title="選擇圖片" onPress={pickImage} />
        </View>
    );
};

export default ImageUpload;