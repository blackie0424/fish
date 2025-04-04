import { useState } from "react";
import { Alert } from "react-native";
import { router } from 'expo-router';

export default function useCreateNote(id: string) {

    const [note, setNote] = useState<string | null>(null);
    const [noteType, setNoteType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // 提交狀態
    const [isDisalbed, setDisalbed] = useState(false);


    const handleSubmit = async () => {

        if (!note || !noteType) {
            Alert.alert("Error", "Please fill in both note and note type.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://tao-among.vercel.app/prefix/api/fish/${id}/note`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    note: note,
                    note_type: noteType,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // 成功（201）
                Alert.alert("Success", "Note added successfully!");
                router.push({
                    pathname: `/fish/${id}`,
                    params: { shouldRefresh: "true" }, // 通過 params 傳遞
                });
            } else {
                // 處理錯誤
                if (response.status === 404) {
                    Alert.alert("Error", "Fish not found.");
                } else if (response.status === 422) {
                    Alert.alert("Error", "Validation failed: " + result.message);
                } else {
                    Alert.alert("Error", result.message || "Failed to add note.");
                }
            }
        } catch (error) {
            Alert.alert("Error", "Network error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        note, setNote,
        noteType, setNoteType,
        isDisalbed, setDisalbed,
        handleSubmit,
    };
}