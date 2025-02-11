import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native";

import SelectionGroup from "@/components/SelectGroup";
import useAddFish from "@/hooks/useCreateFish";

export default function AddFishScreen() {

    const {
        fishName, setFishName,
        locate, setSelectedLocation,
        fishType, setSelectedType,
        image, setImage,
        selectedProcessing, setSelectedProcessing,
        handleSubmit,
    } = useAddFish();

    const locations = ["Iraraley", "Iranmeylek", "Ivalino", "Imorod", "Iratay", "Yayo"];
    const types = ["oyod", "rahet"];
    const processingOptions = ["isisan", "jingisisi", "kolitan"];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* 魚名稱輸入框 */}
                <TextInput
                    style={styles.input}
                    value={fishName}
                    onChangeText={setFishName}
                    placeholder="ngaran no among"
                />
                <View style={styles.separator} />
                <SelectionGroup options={locations} selected={locate} onSelect={setSelectedLocation} />
                <View style={styles.separator} />
                <SelectionGroup options={types} selected={fishType} onSelect={setSelectedType} />
                <View style={styles.separator} />
                <SelectionGroup options={processingOptions} selected={selectedProcessing} onSelect={setSelectedProcessing} />

            </ScrollView>
            {/* 確定按鈕 */}
            <Button title="確定" onPress={handleSubmit} />
        </View>
    );
}

// 樣式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        marginVertical: 10,
    }
});