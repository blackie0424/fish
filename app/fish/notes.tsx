
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, Image } from "react-native";
import SelectionGroup from "@/components/SelectGroup";
import { useImage } from '@/context/ImageContext';
import { useLocalSearchParams } from 'expo-router';
import { useState } from "react";
import { FishCard } from "@/components/FishCard";



export default function FishNotesScreen() {
    const { imageUriForAll } = useImage();
    const noteTypes = ["外觀特徵", "分布地區", "傳統價值", "經驗分享", "相關故事", "游棲生態"];
    const { id, fishName, type, process, locate, imageUrl } = useLocalSearchParams();
    const [note, setNote] = useState<string | null>(null);
    const [noteType, setNoteType] = useState<string | null>(null);





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
                style={[styles.button]}
                onPress={() => {
                    // setDisalbeButton(true);
                    // handleSubmit();
                }}
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