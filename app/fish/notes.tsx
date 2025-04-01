
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, Image } from "react-native";
import SelectionGroup from "@/components/SelectGroup";
import { useImage } from '@/context/ImageContext';


export default function FishNotesScreen() {
    const { imageUriForAll } = useImage();
    const noteType = ["外觀特徵", "分布地區", "傳統價值", "經驗分享", "相關故事", "游棲生態"];

    return (
        <View style={styles.container} >

            {/* ✅ 預覽圖片 */}
            {imageUriForAll && <Image source={{ uri: imageUriForAll }} style={styles.preview} />}
            <View style={styles.separator} />
            <Text style={styles.title}>筆記</Text>
            <TextInput
                style={styles.input}
                // value={fishName}
                // onChangeText={setFishName}
                placeholder="請填寫您要記錄的內容"
            />
            {/* 分類 */}
            <Text style={styles.title}>分類</Text>
            <SelectionGroup options={noteType} />


            {/* 確定按鈕 */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
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
        padding: 10,
    },
    preview: {
        width: "100%",
        height: 200,
        resizeMode: "contain"
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#999",
        marginVertical: 10,
    },
    title: {
        marginBottom: 10,
        fontSize: 20
    },
    input: {
        height: 200,
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