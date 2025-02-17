
import React, { useState } from "react";

export default function useGetFishs() {
    const [fishs, setFishs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getFishsFromAPI = async () => {
        try {
            const res = await fetch("https://tao-among.vercel.app/prefix/api/fish");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setFishs(data.data.reverse());
        } catch (error) {
            console.log("get fishs return error messages");
            console.error("Fetch error: ", error.message);
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