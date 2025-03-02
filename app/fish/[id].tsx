import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Loading } from "@/components/Loading";
import { FishCard } from "@/components/FishCard";
import SkeletonFishDetail from "@/components/SkeletonFishDetail";
import useGetFish from "@/hooks/useGetFish";


export default function FishDetailScreen() {
    const { id } = useLocalSearchParams();
    const {
        fishId, setFishId,
        fishData, setFishData,
        isLoading, setIsLoading,
        getFishDataFromAPI, clearFishData
    } = useGetFish();

    useEffect(() => {
        clearFishData();
        setFishId(id);
        console.log("call get fish data by fish id is:" + id);
        setIsLoading(true);
        getFishDataFromAPI();
    }, [id]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View>
                    <SkeletonFishDetail />
                    <Loading style={styles.loadingOverlay} />
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={fishData}
                    renderItem={({ item }) => (
                        <View>
                            <FishCard
                                id={item.id}
                                name={item.name ?? ""}
                                category={item.type ?? ""}
                                imgUri={item.image ?? ""}
                            />

                            <View style={styles.advanceView}>
                                {/* 分布地區的資料 */}
                                <View style={styles.descriptionView}>
                                    <Text style={styles.descriptionText}>yanan da</Text>
                                </View>
                                {/* 游棲生態的資料 */}
                                <View style={styles.descriptionView}>
                                    <Text style={styles.descriptionText}>kamoamong da</Text>
                                </View>
                            </View>


                            <Text>{fishData[0].description}</Text>
                        </View>
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
    },
    advanceView: {
        height: 300,
        margin: 10,
        padding: 10,
        backgroundColor: "#E5C29F",
        borderRadius: 20,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 }
    },
    descriptionView: {
        width: 200,
        height: 35,
        borderRadius: 50,
        opacity: 0.9,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: 100,
        backgroundColor: "#FFF9F5",

    },
    descriptionText: {
        textAlign: "center",
        fontSize: 20,
    },
    loadingOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});
