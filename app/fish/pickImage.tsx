import React, { useEffect } from 'react';
import { View, Button, Image, Alert } from 'react-native';
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
                            try {
                                Alert.alert('提示', '下一步按鈕被點擊'); // 測試點 1
                                const newUri = await persistImage(imageUri);
                                console.log('Passing imageUri:', newUri);
                                navigation.navigate('create', { imageUri: newUri });
                                Alert.alert('提示', '導航已觸發'); // 測試點 2
                            } catch (error) {
                                console.error('Navigation error:', error);
                                Alert.alert('錯誤', '操作失敗: ' + error.message);
                            }
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