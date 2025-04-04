import { useState } from "react";
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Alert
} from "react-native";
import { useLocalSearchParams, router } from 'expo-router';

import SelectionGroup from "@/components/SelectGroup";
import { FishCard } from "@/components/FishCard";
import useCreateNote from "@/hooks/useCreateNote";

export default function FishNotesScreen() {
    const { id, fishName, type, process, locate, imageUrl } = useLocalSearchParams();

    const {
        note, setNote,
        noteType, setNoteType,
        isDisalbed, setDisalbed,
        handleSubmit,
    } = useCreateNote(id as string);

    const noteTypes = ["外觀特徵", "分布地區", "傳統價值", "經驗分享", "相關故事", "游棲生態"];

    return (
        <View style={styles.container} >
            <FishCard
                id={id}
                name={fishName}
                type={type}
                locate={locate}
                imgUri={imageUrl}
                process={process}
            />
            <Text style={styles.title}>筆記</Text>
            <TextInput
                style={styles.input}
                multiline={true} // 啟用多行輸入
                numberOfLines={5} // 初始顯示 5 行
                textAlignVertical="top" // 文字從頂部開始（Android 需要）
                value={note}
                onChangeText={setNote}
                placeholder="請填寫您要記錄的內容"
            />
            {/* 分類 */}
            <Text style={styles.title}>分類</Text>
            <SelectionGroup options={noteTypes} selected={noteType} onSelect={setNoteType} />


            {/* 確定按鈕 */}
            <TouchableOpacity
                style={[styles.button, isDisalbed && { backgroundColor: "#ccc" }]}
                onPress={() => {
                    setDisalbed(true);
                    handleSubmit();
                }}
                disabled={isDisalbed}
            >
                <Text style={styles.buttonText}>新增筆記</Text>
            </TouchableOpacity>
        </View >
    )
}


const deviceWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        marginTop: 5,
        marginBottom: 5,
        left: 10,
        fontSize: 20
    },
    input: {
        height: 150,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF", // 藍色
        paddingVertical: 12,
        borderRadius: 18, // 圓角
        alignItems: "center",
        marginBottom: 200,
        width: deviceWidth * 0.8,
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});