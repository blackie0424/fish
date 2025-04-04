import { useState, useEffect } from "react";
import fishService from "@/services/fishService";
import localStorageService from "@/services/locatStroageService";


import { useLocalSearchParams } from "expo-router";

export default function useGetFish() {
    const { id } = useLocalSearchParams() as unknown as { id: number }; // 取得網址中的 id
    const [fishId, setFishId] = useState(id);
    const [fishData, setFishData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
    const [notes, setNotes] = useState<any[]>([]);



    console.log("get fish id:" + id);
    const fetchFish = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const storedData = await localStorageService.getData('fish' + id);
            if (storedData) {
                setFishData(storedData);
                const lastUpdateTimeFromLocalStorage = await localStorageService.getData('fish' + id + 'lastUpdateTime') || 0;
                setLastUpdateTime(lastUpdateTimeFromLocalStorage);
                const notesFromLocalStorage = await localStorageService.getData('fish' + id + 'notes') || [];
                setNotes(notesFromLocalStorage);
                console.log('the fish data fetched from AsyncStorage');
            } else {
                console.log("the fish data fetched from api by fish id:" + id);
                const apiData = await fishService.getFish(id);
                console.log(apiData.lastUpdateTime, apiData);
                setFishData(apiData.data);
                setNotes(apiData.data.notes);
                setLastUpdateTime(apiData.lastUpdateTime);

                await localStorageService.storeData('fish' + id, apiData.data);
                await localStorageService.storeData('fish' + id + 'lastUpdateTime', apiData.lastUpdateTime);
                await localStorageService.storeData('fish' + id + 'notes', apiData.data.notes);


                console.log('Data fetched from API and stored in AsyncStorage');
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        try {
            setIsLoading(true);
            setError(null);
            console.log("refresh the fish  note - onRefresh triggered");
            const response = await fishService.fetchNotesSince(id, lastUpdateTime);
            setLastUpdateTime(response.lastUpdateTime);
            await localStorageService.storeData('fish' + id + 'lastUpdateTime', response.lastUpdateTime);

            setNotes((prevNotes) => {
                const newNotes = response.data.filter((newNote: any) => {
                    const isDuplicate = prevNotes.some((note: any) => note.id === newNote.id);
                    return !isDuplicate;
                });

                let updatedNotes: any[] = [];
                if (newNotes.length > 0) {
                    updatedNotes = [...newNotes, ...prevNotes];

                    // 直接在這裡執行後續邏輯
                    if (updatedNotes.length > 0) {
                        console.log("Updating AsyncStorage with:", updatedNotes);
                        localStorageService.storeData('fish' + id + 'notes', updatedNotes).catch((storageError) => {
                            console.error("Error updating AsyncStorage:", storageError);
                            setNotes(prevNotes); // 恢復舊狀態
                            setError('無法更新本地儲存，請稍後再試');
                        });
                    }
                } else {
                    console.log("No new unique fish to add.");
                    updatedNotes = [...prevNotes];
                }

                return updatedNotes;
            });

        } catch (error) {
            if (error.message === 'HTTP error! status: 404') {
                setError('找不到資料');
            } else if (error.message === 'HTTP error! status: 500') {
                setError('抱歉，系統出了點問題，請稍後再試');
            } else if (error.message === 'Network Error') {
                setError('網路錯誤，請檢查網路連線後再試');
            } else {
                setError('發生預期外的錯誤，請稍後再試');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFish();
    }, []);

    return {
        fishId, setFishId,
        fishData, notes,
        isLoading, setIsLoading,
        error,
        fetchFish, onRefresh
    };
}