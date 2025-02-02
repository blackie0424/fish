import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Header } from "../../../components/Header";
import { Loading } from "../../../components/Loading";
import { FishCard } from "../../../components/FishCard";




export default function HomeScreen() {
    const { id } = useLocalSearchParams(); // 取得網址中的 id
    const URL = "https://tao-among.vercel.app/apifish/" + id;

    const [fishData, setFishData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFishData();
    }, [id]);

    const getFishData = async () => {
        try {
            const res = await fetch(URL)
            if (!res.ok) throw new Error("something error!" + id);
            const data = await res.json();
            setFishData(Array.isArray(data) ? data : [data]);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={fishData ?? fakeData}
                    renderItem={({ item }) => (
                        <FishCard
                            id={item.id}
                            traditionalName={item.traditional_name}
                            name={item.name ?? ""}
                            category={item.type ?? ""}
                            imgUri={item.image ?? ""}
                        />
                    )}
                />
            )}

        </View >
    );

}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003F5E"
    }
});
