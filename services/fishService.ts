
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

            //ignore message
            console.log("Get the fish data has some problem in fishService.ts");

            return data.data;
        } catch (error) {
            throw error;
        }
    }
}

export default Fish;

