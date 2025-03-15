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

    console.log("get fish id:" + id);
    const fetchFish = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const storedData = await localStorageService.getData('fish' + id);
            if (storedData) {
                setFishData(storedData);
                console.log('the fish data fetched from AsyncStorage');
            } else {
                console.log("the fish data fetched from api by fish id:" + id);
                const apiData = await fishService.getFish(id);
                setFishData(apiData);
                await localStorageService.storeData('fish' + id, apiData);
                console.log('Data fetched from API and stored in AsyncStorage');
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFish();
    }, []);

    return {
        fishId, setFishId,
        fishData,
        isLoading, setIsLoading,
        error,
        fetchFish
    };
}