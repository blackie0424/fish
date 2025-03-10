import React, { useState, useEffect } from 'react';

import { useImage } from '@/context/ImageContext';


export default function useUploadImage() {
    const API_URL = `${process.env.EXPO_PUBLIC_API_URL}upload`;
    const { imageUriForAll } = useImage();

    // 這是上傳圖片的函數
    const uploadImage = async () => {
        const localUri = imageUriForAll.replace('file://', ''); // 處理 URI 的問題
        const filename = localUri.split('/').pop(); // 取得檔名
        console.log("imageUriForAll is:" + imageUriForAll);

        const formData = new FormData();
        formData.append('image', {
            uri: localUri,
            name: filename
        });

        const requestOptions = {
            method: "POST",
            body: formData
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const responseData = await response.json();
            if (response.ok) {
                console.log(`上傳成功，檔案名稱：${responseData.data}`);
                return responseData.data;
            } else {
                console.log(`上傳失敗: ${responseData.message}`);
                return "default.png";
            }
        } catch (error) {
            console.error(error);
            return "default.png";
        }
    };

    return {
        uploadImage
    };
}