import React, { useEffect, useContext } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import useUploadImage from '@/hooks/useUploadImage';
import { useImage } from '@/context/ImageContext';


const ImageUpload = () => {
    const { imageUri, setImageUri, uploadImage } = useUploadImage();
    const { imageUriForAll, setImageUriForAll } = useImage();

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
            setImageUriForAll(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageUriForAll && <Image source={{ uri: imageUriForAll }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />}
            <Button title="選擇圖片" onPress={pickImage} />
        </View>
    );
};

export default ImageUpload;