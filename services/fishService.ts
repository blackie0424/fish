
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
            console.log("Get fishs data has some problem 2");
            throw error;
        }
    },
    getFish: async (id: number) => {
        try {
            const response = await fetch(API_URL + "/" + id, { method: "GET" });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.log("Get fish data has some problem!");
            console.error(error);
        }
    }
}

export default Fish;

