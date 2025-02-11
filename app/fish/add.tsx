import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native";

export default function AddFishScreen() {

    const url = "https://tao-among.vercel.app/prefix/api/fish";

    const [fishName, setFishName] = useState("");
    const [locate, setSelectedLocation] = useState(null);
    const [fishType, setSelectedType] = useState(null);
    const [selectedProcessing, setSelectedProcessing] = useState(null);

    const locations = ["Iraraley", "Iranmeylek", "Ivalino", "Imorod", "Iratay", "Yayo"];
    const types = ["oyod", "rahet"];
    const processingOptions = ["isisan", "jingisisi", "kolitan"];

    const handleSubmit = () => {
        console.log("check...");
        if (!fishName.trim()) {
            alert("請輸入魚的名稱");
            return;
        }

        const newFish = new FormData();
        newFish.append("name", fishName);
        newFish.append("type", fishType ? fishType : ""); // 如果可能為 null，確保它是空字串
        newFish.append("locate", locate);
        newFish.append("image", "default.png");
        newFish.append("process", selectedProcessing);


        for (let [key, value] of newFish.entries()) {
            console.log(`${key}: ${value}`);
        }
        const requestOptions = {
            method: "POST",
            body: newFish,
            redirect: "follow"
        };

        fetch(url, requestOptions)
            .then(async (response) => {
                console.log("Response status:", response.status);
                const text = await response.text(); // 直接讀取回應內容，避免 JSON 解析錯誤
                console.log("Response text:", text);
                return JSON.parse(text); // 確保 JSON 解析
            })
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));

    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* 灰色區塊（可能是圖片上傳或顯示區） */}
                <View style={styles.imagePlaceholder} />

                {/* 魚名稱輸入框 */}
                <TextInput
                    style={styles.input}
                    value={fishName}
                    onChangeText={setFishName}
                    placeholder="ngaran no among"
                />

                {/* 地點選擇 */}
                <View style={styles.separator} />
                <View style={styles.section}>
                    {locations.map((loc) => (
                        <TouchableOpacity
                            key={loc}
                            style={[styles.button, locate === loc && styles.selectedButton]}
                            onPress={() => setSelectedLocation(loc)}
                        >
                            <Text style={styles.buttonText}>{loc}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 魚類分類選擇（可都不選） */}
                <View style={styles.separator} />
                <View style={styles.section}>
                    {types.map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.button, fishType === type && styles.selectedButton]}
                            onPress={() => setSelectedType(fishType === type ? null : type)} // 可取消選擇
                        >
                            <Text style={styles.buttonText}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 處理方式選擇 */}
                <View style={styles.separator} />
                <View style={styles.section}>
                    {processingOptions.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.button, selectedProcessing === option && styles.selectedButton]}
                            onPress={() => setSelectedProcessing(option)}
                        >
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

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
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#666",
        padding: 15,
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        color: "#fff",
        fontSize: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
    },
    scrollContainer: {
        padding: 20,
    },
    imagePlaceholder: {
        height: 150,
        backgroundColor: "#ccc",
        marginBottom: 20,
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
    },
    section: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    button: {
        borderWidth: 1,
        borderColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 5,
    },
    selectedButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "black",
    },
});