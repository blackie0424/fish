interface FishObject {
    name: string; // 必填
    type?: string; // 可選
    locate?: string; // 可選
    image?: string; // 可選
}

const API_URL = "https://tao-among.vercel.app/prefix/api/fish";

const Fish = {
    getFishs: async () => {
        try {
            const response = await fetch(API_URL, { method: "GET" });
            if (!response.ok) {
                throw Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.log("Get fishs data has some problem in fishService.ts");
            throw error;
        }
    },
    getFish: async (id: number) => {
        try {
            const response = await fetch(API_URL + "/" + id, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return data.data;
        } catch (error) {
            console.log("Get the fish data has some problem in fishService.ts");
            throw error;
        }
    },
    createFish: async (fish: FishObject) => {

        if (!fish.name || fish.name.trim() === '') throw new Error('The fish name is required.');

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fish),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Response text:", result.message);
            return result.data;
        } catch (error) {
            console.log("Create the fish has some problem in fishService.ts");
            throw error;
        }
    },
    updateFishs: async (lastUpdateTime: number) => {
        //1. 送出update 請求
        try {
            const response = await fetch(API_URL + "?since=" + lastUpdateTime, { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return data;
        } catch (error) {
            console.log("update fishs has some problem in fishService.ts");
            throw error;
        }
    },


}

export default Fish;

