
import React, { useState } from "react";

export default function useGetFishs() {
    const [fishs, setFishs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getFishsFromAPI = async () => {

        //重置設定
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/fish`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setFishs(data.data.reverse());
        } catch (error) {
            console.log("Get fishs data has some problem!");
            if (error.message === "HTTP error! status: 404") {
                setError("找不到資料");
            }
            //setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fishs,
        isLoading,
        error,
        getFishsFromAPI,
    };
}