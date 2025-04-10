import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, Button, Alert } from 'react-native';
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
        console.log('Navigation object:', navigation); // 檢查 navigation
        navigation.setOptions({
            headerRight: () =>
                imageUri ? (
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Pressed, passing imageUri:', imageUri);
                            if (navigation && typeof navigation.navigate === 'function') {
                                navigation.navigate('create', { imageUri });
                                Alert.alert('提示', '導航觸發');
                            } else {
                                Alert.alert('錯誤', '導航物件無效');
                            }
                        }}
                        style={{ marginRight: 10, padding: 10 }} // 增加觸控範圍
                    >
                        <Text style={{ color: '#007AFF', fontSize: 16 }}>下一步5</Text>
                    </TouchableOpacity>
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