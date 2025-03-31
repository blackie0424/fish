
import React, { useState, useEffect } from "react";
import fishService from "@/services/fishService";
import localStorageService from "@/services/locatStroageService";


export default function useGetFishs() {
    const [fishs, setFishs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 獲取資料的邏輯（從 AsyncStorage 或 API）
    const fetchFishs = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // 從 AsyncStorage 獲取資料
            const storedData = await localStorageService.getData('fishs');
            if (storedData) {
                setFishs(storedData);
                console.log('Data fetched from AsyncStorage');
            } else {
                // 如果 AsyncStorage 無資料，從 API 獲取
                const apiData = await fishService.getFishs();
                setFishs(apiData);
                await localStorageService.storeData('fishs', apiData);
                await localStorageService.storeData('lastUpdateTime', Date.now());

                console.log('Data fetched from API and stored in AsyncStorage');
            }
        } catch (error) {
            setError(null);
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

    const onRefresh = async () => {
        console.log("refresh fish list");
        // const mockdata = {
        //     id: 122,
        //     name: "ibow",
        //     type: "rahet",
        //     locate: "Iraraley",
        //     process: "isisan",
        //     image: "https://etycehppghhlxqpdvlga.supabase.co/storage/v1/object/public/tao_among_storage/images/1742053444_072B0235-1F8F-4DC0-9C80-55DCACD2E5B2.png"
        // };
        // const oldFishs = await localStorageService.getData('fishs') || [];
        // const isDuplicate = oldFishs.some((fish: any) => fish.id === mockdata.id);
        // if (!isDuplicate) {
        //     console.log("~~~~~~" + oldFishs);
        //     const updatedFishs = [mockdata, ...oldFishs];
        //     console.log("!!!!!!" + updatedFishs);
        //     setFishs(updatedFishs);
        //     await localStorageService.storeData('fishs', updatedFishs);
        // }
        // localStorageService.delAData('fishs');
    };
    // 初始載入時觸發
    useEffect(() => {
        //localStorageService.delAData('fishs');
        fetchFishs();
    }, []); // 僅在組件掛載時執行一次

    return {
        fishs,
        isLoading,
        error,
        fetchFishs,
        onRefresh
    };
}