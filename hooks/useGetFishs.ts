
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
            } else if (error.message === "HTTP error! status: 500") {
                setError("抱歉，系統出了點問題，請稍後再試");
            } else if (error.message === "Network Error") {
                setError("網路錯誤，請檢查網路連線後再試");
            } else {
                setError("發生預期外的錯誤，請稍後再試");
            }
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