import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextType {
    imageUriForAll: string | null;
    setImageUriForAll: (uri: string) => void;
}

// ✅ 確保 Context 使用正確的變數名稱
const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [imageUriForAll, setImageUriForAll] = useState<string | null>(null);

    return (
        <ImageContext.Provider value={{ imageUriForAll, setImageUriForAll }}>
            {children}
        </ImageContext.Provider>
    );
};

// ✅ 確保 useImage() 讀取正確的 Context 值
export const useImage = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImage 必須在 ImageProvider 內使用");
    }
    return context;
};