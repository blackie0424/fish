import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";

import { FishCard } from "@/components/FishCard";
import { Loading } from "@/components/Loading";

import { useRouter, useLocalSearchParams } from 'expo-router';


export default function HomeScreen() {
  const [fishs, setFishs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // 用來判斷是否需要刷新資料
  const { refresh } = useLocalSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getFishs();
    // 清除 refresh 狀態，避免一直重新請求
    if (refresh === "true") {
      router.replace("/fish");  // 跳轉到相同頁面來移除 refresh 狀態
    }
  }, [refresh]);

  const getFishs = async () => {
    try {
      const res = await fetch("https://tao-among.vercel.app/prefix/api/fish");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFishs(data.data.reverse());
    } catch (error) {
      console.log("get fishs return error messages");
      console.error("Fetch error: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fishs}
          renderItem={({ item }) => (
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
