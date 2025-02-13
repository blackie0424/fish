import React, { useState, useEffect } from 'react';

import { useLocalSearchParams, useRouter } from 'expo-router';


export default function useUploadImage() {
    const API_URL = "http://tao-among.vercel.app/prefix/api/upload";
    const [imageUri, setImageUri] = useState<string | null>(null);

    const router = useRouter();

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
            const response = await fetch(API_URL, requestOptions);
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

    return {
        imageUri, setImageUri,
        uploadImage
    };
}