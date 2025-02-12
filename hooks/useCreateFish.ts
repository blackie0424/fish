import { useState } from "react";


const API_URL = "https://tao-among.vercel.app/prefix/api/fish";

export default function useAddFish() {
    const [fishName, setFishName] = useState("");
    const [locate, setSelectedLocation] = useState<string | null>(null);
    const [fishType, setSelectedType] = useState<string | null>(null);
    const [selectedProcessing, setSelectedProcessing] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>("");


    const handleSubmit = async () => {
        if (!fishName.trim()) {
            alert("請輸入魚的名稱");
            return;
        }

        const fish = new FormData();
        fish.append("name", fishName);
        fish.append("type", fishType ?? "");
        fish.append("locate", locate ?? "");
        fish.append("image", imageName || "default.png");
        fish.append("process", selectedProcessing ?? "");

        console.log("🚀 Sending data:", Object.fromEntries(fish.entries()));

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: fish,
            });

            console.log("Response status:", response.status);
            const text = await response.text();
            console.log("Response text:", text);

            if (!response.ok) throw new Error("API 回應錯誤");

            alert("魚資料已成功新增！");
        } catch (error) {
            console.error("❌ Error:", error);
        }
    };

    return {
        fishName, setFishName,
        locate, setSelectedLocation,
        fishType, setSelectedType,
        selectedProcessing, setSelectedProcessing,
        imageName, setImageName,
        handleSubmit,
    };
}