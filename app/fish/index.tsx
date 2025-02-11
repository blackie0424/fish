import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";

import { FishCard } from "@/components/FishCard";
import { Loading } from "@/components/Loading";

import { useRouter, Link } from 'expo-router';


export default function HomeScreen() {
  const [fishs, setFishs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getFishs();
  }, []);

  const getFishs = async () => {
    try {
      const res = await fetch("https://tao-among.vercel.app/prefix/api/fish");
      if (!res.ok) throw new Error("something error!");
      const data = await res.json();
      setFishs(data.data.reverse());
    } catch (error) {
      console.error(error);
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
