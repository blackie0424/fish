import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, Text } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

import { FishCard } from "@/components/FishCard";
import { Loading } from "@/components/Loading";
import useGetFishs from "@/hooks/useGetFishs"


export default function HomeScreen() {
  const { fishs, isLoading, getFishsFromAPI, error } = useGetFishs();
  const router = useRouter();
  // 用來判斷是否需要刷新資料
  const { refresh } = useLocalSearchParams();

  useEffect(() => {
    getFishsFromAPI();
    // 清除 refresh 狀態，避免一直重新請求
    if (refresh === "true") {
      router.replace("/fish");  // 跳轉到相同頁面來移除 refresh 狀態
    }
  }, [refresh]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Text>{error}</Text>
      ) : fishs.length === 0 ? (
        <Text>目前沒有資料</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fishs}
          renderItem={({ item }: { item: { id: number; name: string; type: string; image: string } }) => (
            <Pressable onPress={function () {
              router.push(`/fish/${item.id}`)
            }}>
              <FishCard
                id={item.id}
                name={item.name ?? ""}
                category={item.type ?? ""}
                imgUri={item.image ?? ""}
              />
            </Pressable>
          )}
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
  }
});
