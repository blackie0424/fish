import { useState } from "react";
import { useRouter } from 'expo-router';
import { useImage } from '@/context/ImageContext';

import FishService from '@/services/fishService';

export default function useCreateFish() {
    const [fishName, setFishName] = useState("");
    const [locate, setSelectedLocation] = useState<string | null>(null);
    const [fishType, setSelectedType] = useState<string | null>(null);
    const [selectedProcessing, setSelectedProcessing] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [isDisalbed, setDisalbeButton] = useState(true);

    const route = useRouter();
    const { setImageUriForAll } = useImage();


    const handleSubmit = async () => {
        if (!fishName.trim()) {
            alert("請輸入魚的名稱");
            return;
        }

        const fish = {
            name: fishName,
            type: fishType ?? "",
            locate: locate ?? "",
            image: imageName || "default.png"
        };

        try {
            await FishService.createFish(fish);
            setFishName("");
            setSelectedLocation(null);
            setSelectedType(null);
            setSelectedProcessing(null);
            setImageName("");
            setDisalbeButton(true);
            setImageUriForAll("");
            alert("魚資料已成功新增！");
            route.push("/fish?refresh=true");
        } catch (error) {
            alert('新增魚資料失敗，請稍後再試。');
            route.push("/fish");
        }
    };

    return {
        fishName, setFishName,
        locate, setSelectedLocation,
        fishType, setSelectedType,
        selectedProcessing, setSelectedProcessing,
        imageName, setImageName,
        isDisalbed, setDisalbeButton,
        handleSubmit,
    };
}