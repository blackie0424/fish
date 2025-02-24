
import React, { useState } from "react";
import fishService from "@/services/fishService";

export default function useGetFishs() {
    const [fishs, setFishs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getFishsFromAPI = async () => {

        //重置設定
        setError(null);
        setIsLoading(true);

        try {
            const fishs = await fishService.getFishs();
            setFishs(fishs.reverse());
        } catch (error) {
            console.log("Get fishs data has some problem 1");
            if (error.message === "Fish list not found") {
                setError("找不到資料");
            } else if (error.message === "Server error occurred") {
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