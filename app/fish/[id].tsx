import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Loading } from "@/components/Loading";
import { FishCard } from "@/components/FishCard";
import SkeletonFishDetail from "@/components/SkeletonFishDetail";
import useGetFish from "@/hooks/useGetFish";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/hooks/useColorScheme';




export default function FishDetailScreen() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? '#003F5E' : '#FFFFFF';
    const iconColor = backgroundColor === '#003F5E' ? '#FFFFFF' : '#000000';

    const { id } = useLocalSearchParams();
    const {
        fishData,
        isLoading,
        fetchFish
    } = useGetFish();

    useEffect(() => {
        fetchFish();
    }, [id]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View>
                    <SkeletonFishDetail />
                    <Loading style={styles.loadingOverlay} />
                </View>
            ) : (

                <View>
                    <FishCard
                        id={fishData.id}
                        name={fishData.name ?? ""}
                        type={fishData.type ?? ""}
                        locate={fishData.locate ?? ""}
                        imgUri={fishData.image ?? ""}
                        process={fishData.process ?? ""}
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

                    <Text>{fishData.description}</Text>
                    <View style={[styles.tabBar, { backgroundColor: backgroundColor }]}>
                        <TouchableOpacity
                            style={styles.notesButton}
                        >
                            <FontAwesome name="sticky-note" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>


            )
            }

        </View >
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#003F5E",
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
    tabBar: {
        position: "absolute",
        bottom: -30,
        right: 20,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    notesButton: {
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // 輕微背景，視設計調整
        borderRadius: 30,
    },
});
