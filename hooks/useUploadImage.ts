import React from 'react';


export default function useUploadImage() {
    const API_URL = `${process.env.EXPO_PUBLIC_API_URL}upload`;

    // 這是上傳圖片的函數
    const uploadImage = async (imageUri: string) => {


        const localUri = imageUri; // 保留原始 URI，不移除 file://
        console.log("localUri: " + localUri);
        const filename = localUri.split('/').pop() || 'default.png'; // 確保有預設檔名
        console.log("filename: " + filename);
        const match = /\.(\w+)$/.exec(filename);
        console.log("match: " + match);
        const type = match ? `image/${match[1]}` : 'image/jpeg'; // 動態取得 MIME 類型
        console.log("type: " + type);

        const formData = new FormData();
        formData.append('image', {
            uri: localUri,
            name: filename,
            type, // 明確指定 MIME 類型
        });
        console.log("formData: " + formData);
        const requestOptions = {
            method: "POST",
            body: formData
        };
        console.log("requestOptions: " + requestOptions);
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
            console.error("WDWDWDWD" + error);
            return "default.png";
        }
    };

    return {
        uploadImage
    };
}