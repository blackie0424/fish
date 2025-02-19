
import React, { useState } from "react";

export default function useGetFishs() {
    const [fishs, setFishs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getFishsFromAPI = async () => {
        try {
            const res = await fetch(process.env.EXPO_PUBLIC_API_URL + "/fish");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setFishs(data.data.reverse());
        } catch (error) {
            console.log("Get fishs data has some problem!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fishs,
        isLoading, setIsLoading,
        getFishsFromAPI,
    };
}