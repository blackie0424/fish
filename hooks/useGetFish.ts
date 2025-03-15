import { useState, useEffect } from "react";
import fishService from "@/services/fishService";

import { useLocalSearchParams } from "expo-router";

export default function useGetFish() {
    const { id } = useLocalSearchParams() as unknown as { id: number }; // 取得網址中的 id
    const [fishId, setFishId] = useState(id);
    const [fishData, setFishData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log("get fish id:" + id);
    const getFishDataFromAPI = async () => {
        try {
            setIsLoading(true);
            setError(null);
            console.log("call get fish api by fish id:" + id);
            const apiData = await fishService.getFish(id);
            setFishData(apiData);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFishDataFromAPI();
    }, []);

    const clearFishData = async () => {
        setFishData(null);
        setIsLoading(false);
    }

    return {
        fishId, setFishId,
        fishData,
        isLoading, setIsLoading,
        error,
        getFishDataFromAPI,
        clearFishData
    };
}