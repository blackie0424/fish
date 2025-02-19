import React, { useState } from "react";

import { useLocalSearchParams } from "expo-router";

export default function useGetFish() {
    const { id } = useLocalSearchParams(); // 取得網址中的 id
    const [fishId, setFishId] = useState(id);
    const [fishData, setFishData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = `${process.env.EXPO_PUBLIC_API_URL}fish/${id}`;

    console.log("get fish id:" + id);
    const getFishDataFromAPI = async () => {
        try {
            const res = await fetch(API_URL)
            console.log("call get fish api by fish id:" + fishId);
            if (!res.ok) throw new Error("something error!" + id);
            const data = await res.json();
            setFishData(Array.isArray(data.data) ? data.data : [data.data]);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearFishData = async () => {
        setFishId("");
        setFishData([]);
        setIsLoading(false);
    }

    return {
        fishId, setFishId,
        fishData, setFishData,
        isLoading, setIsLoading,
        getFishDataFromAPI,
        clearFishData
    };
}