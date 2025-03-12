import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageService = {
    storeData: async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.log("Store data has some problem in locatStroageService.ts");
            throw error;
        }
    },
    getData: async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("Get data has some problem in locatStroageService.ts");
            throw e;
        }
    },
    delAData: async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.log("Delete a data has some problem in locatStroageService.ts");
            throw e;
        }
    },
    delAllData: async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.log("Clear data has some problem in locatStroageService.ts");
            throw e;
        }
    }
}

export default localStorageService;