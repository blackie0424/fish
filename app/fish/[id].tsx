import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

import { Loading } from "@/components/Loading";
import { FishCard } from "@/components/FishCard";
import SkeletonFishDetail from "@/components/SkeletonFishDetail";
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/hooks/useColorScheme';
import useGetFish from "@/hooks/useGetFish";


export default function FishDetailScreen() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? '#003F5E' : '#FFFFFF';
    const iconColor = backgroundColor === '#003F5E' ? '#FFFFFF' : '#000000';
    const router = useRouter();

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
                <View style={styles.loadingView}>
                    <SkeletonFishDetail />
                    <View style={styles.loadingOverlay}>
                        <Loading />
                    </View>
                </View>
            ) : (

                <View style={styles.dataView}>
                    <FishCard
                        id={fishData.id}
                        name={fishData.name ?? ""}
                        type={fishData.type ?? ""}
                        locate={fishData.locate ?? ""}
                        imgUri={fishData.image ?? ""}
                        process={fishData.process ?? ""}
                    />
                    <ScrollView>
                        {fishData.notes && fishData.notes.length > 0 && (
                            fishData.notes.map((note, index) => (
                                <View key={index} style={styles.advanceView}>
                                    <View style={styles.descriptionView}>
                                        <Text style={styles.descriptionTitle}>{note.note_type}</Text>
                                        <Text style={styles.descriptionText}>{note.note}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>

                    <View style={[styles.tabBar, { backgroundColor: backgroundColor }]}>
                        <TouchableOpacity
                            onPress={() => router.push(
                                {
                                    pathname: "/fish/notes",
                                    params: {
                                        id: id,
                                        fishName: fishData.name,
                                        imageUrl: fishData.image,
                                        type: fishData.type,
                                        process: fishData.process,
                                        locate: fishData.locate
                                    },
                                }
                            )}
                            style={styles.notesButton}
                        >
                            <FontAwesome name="sticky-note" size={24} color={iconColor} />
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
        flex: 1, // Ensures the container takes up the full screen
        backgroundColor: "#003F5E",
    },

    loadingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(197, 196, 196, 0.5)",
    },

    loadingOverlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire screen
        backgroundColor: "rgba(197, 196, 196, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    dataView: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 20,
    },
    advanceView: {
        margin: 10,
        padding: 10,
        backgroundColor: "#E5C29F",
        borderRadius: 20,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 }
    },
    descriptionView: {
        alignItems: "flex-start", // Changed to flex-start to align content to the top-left
    },

    descriptionTitle: {
        width: 120,
        height: 40,
        marginBottom: 10, // Adjusted to create space below the title
        lineHeight: 40,
        borderRadius: 50,
        opacity: 0.9,
        backgroundColor: "#FFF9F5",
        textAlign: "center",
        fontSize: 20,
        paddingHorizontal: 20, // Add padding to ensure text doesn't touch the edges
    },

    descriptionText: {
        fontSize: 20,
        marginHorizontal: 20, // Add margin to create equal spacing on both sides
    },

    tabBar: {
        position: "absolute",
        bottom: 20,
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
