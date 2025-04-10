import React, { useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usePickImage from '@/hooks/usePickImage';

const pickImagePage = () => {
    const navigation = useNavigation();
    const {
        imageUri, setImageUri,
        pickImage,
    } = usePickImage();

    // 動態設置右上角的「下一步」按鈕
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                imageUri ? (
                    <Button
                        title="下一步"
                        onPress={() => {
                            navigation.navigate('create', { imageUri: imageUri });
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