import { useState } from "react";
import { Alert } from "react-native";
import { router } from 'expo-router';
import FishService from '@/services/fishService';


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

        const fishNote = {
            note: note,
            note_type: noteType
        };

        setLoading(true);

        try {
            const response = await FishService.createNote(id, fishNote);
            router.push({
                pathname: `/fish/${id}`,
                params: { shouldRefresh: "true" }, // 通過 params 傳遞
            });

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