import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable, Text, RefreshControl } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

import { FishCard } from "@/components/FishCard";
import { Loading } from "@/components/Loading";
import SkeletonFishCard from "@/components/SkeletonFishCard"

import useGetFishs from "@/hooks/useGetFishs"



export default function HomeScreen() {
  const { fishs, isLoading, fetchFishs, onRefresh, error } = useGetFishs();
  const router = useRouter();
  // 用來判斷是否需要刷新資料
  const { refresh } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchFishs();

    // 清除 refresh 狀態，避免一直重新請求
    if (refresh === "true") {
      router.replace("/fish");  // 跳轉到相同頁面來移除 refresh 狀態
    }
  }, [refresh]);

  const skeletonData = Array(3).fill({});

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={skeletonData}
            renderItem={() => <SkeletonFishCard />}
          />
          <Loading style={styles.loadingOverlay} />
        </View>
      ) : error ? (
        <Text>{error}</Text>
      ) : fishs.length === 0 ? (
        <Text>目前沒有資料</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fishs}
          renderItem={({ item }: { item: { id: number; name: string; type: string; image: string, process: string } }) => (
            <Pressable onPress={function () {
              router.push(`/fish/${item.id}`)
            }}>
              <FishCard
                id={item.id}
                name={item.name ?? ""}
                type={item.type ?? ""}
                locate={item.locate ?? ""}
                imgUri={item.image ?? ""}
                process={item.process ?? ""}
              />
            </Pressable>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003F5E"
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
