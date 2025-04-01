
import React, { useState, useEffect } from "react";
import fishService from "@/services/fishService";
import localStorageService from "@/services/locatStroageService";


export default function useGetFishs() {
    const [fishs, setFishs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
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
                // 先從 AsyncStorage 獲取 lastUpdateTime
                const lastUpdateTimeFromLocalStorage = await localStorageService.getData('lastUpdateTime') || 0;
                // 更新 lastUpdateTime 狀態
                setLastUpdateTime(lastUpdateTimeFromLocalStorage);
            } else {
                // 如果 AsyncStorage 無資料，從 API 獲取
                const res = await fishService.getFishs();
                setFishs(res.data);
                await localStorageService.storeData('fishs', res.data);
                await localStorageService.storeData('lastUpdateTime', res.lastUpdateTime);
                setLastUpdateTime(res.lastUpdateTime);
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
        try {
            setIsLoading(true);
            setError(null);
            console.log("refresh fish list - onRefresh triggered");
            const response = await fishService.fetchFishsSince(lastUpdateTime);
            setLastUpdateTime(response.lastUpdateTime);
            await localStorageService.storeData('lastUpdateTime', response.lastUpdateTime);

            setFishs((prevFishs) => {
                const newFishs = response.data.filter((newFish: any) => {
                    const isDuplicate = prevFishs.some((fish: any) => fish.id === newFish.id);
                    return !isDuplicate;
                });

                let updatedFishs: any[] = [];
                if (newFishs.length > 0) {
                    updatedFishs = [...newFishs, ...prevFishs];

                    // 直接在這裡執行後續邏輯
                    if (updatedFishs.length > 0) {
                        console.log("Updating AsyncStorage with:", updatedFishs);
                        localStorageService.storeData('fishs', updatedFishs).catch((storageError) => {
                            console.error("Error updating AsyncStorage:", storageError);
                            setFishs(prevFishs); // 恢復舊狀態
                            setError('無法更新本地儲存，請稍後再試');
                        });
                    }
                } else {
                    console.log("No new unique fish to add.");
                    updatedFishs = [...prevFishs];
                }

                return updatedFishs;
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
    // 初始載入時觸發
    useEffect(() => {
        // localStorageService.delAData('fishs');
        // localStorageService.delAData('lastUpdateTime');
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