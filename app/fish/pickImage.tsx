import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usePickImage from '@/hooks/usePickImage';

const pickImagePage = () => {
    const navigation = useNavigation();
    const {
        imageUri,
        error,
        pickImage, persistImage
    } = usePickImage();

    // 動態設置右上角的「下一步」按鈕
    useEffect(() => {
        console.log('Navigation object:', navigation); // 檢查 navigation
        navigation.setOptions({
            headerRight: () =>
                imageUri ? (
                    <TouchableOpacity
                        onPressIn={async () => {
                            console.log('Pressed, passing imageUri:', imageUri);
                            persistImage(imageUri).then(newUri => {
                                navigation.navigate('create', { imageUri: newUri });
                            });
                        }}
                        style={{ marginRight: 10, padding: 10 }} // 增加觸控範圍
                    >
                        <Text style={{ color: '#007AFF', fontSize: 16 }}>下一步</Text>
                    </TouchableOpacity>
                ) : null,
        });
    }, [imageUri, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200, resizeMode: "contain" }} />}
            <Button title="選擇圖片" onPress={pickImage} />
        </View>
    );
};

export default pickImagePage;