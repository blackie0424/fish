import React, { useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usePickImage from '@/hooks/usePickImage';

const pickImagePage = () => {
    const navigation = useNavigation();
    const {
        imageUri,
        pickImage, persistImage
    } = usePickImage();

    // 動態設置右上角的「下一步」按鈕
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                imageUri ? (
                    <Button
                        title="下一步"
                        onPress={async () => {
                            const newUri = await persistImage(imageUri); // 複製到持久化目錄
                            console.log('Passing imageUri:', newUri);
                            navigation.navigate('create', { imageUri: newUri }); // 傳遞新路徑
                        }}
                    />
                ) : null,
        });
    }, [imageUri, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />}
            <Button title="選擇圖片" onPress={pickImage} />
        </View>
    );
};

export default pickImagePage;