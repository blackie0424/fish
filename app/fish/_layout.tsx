import React from 'react';
import { Button, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useImage } from '@/context/ImageContext';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function FishStackLayout() {
  const router = useRouter();
  const { imageUriForAll, setImageUriForAll } = useImage();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#003F5E' : '#FFFFFF';
  const iconColor = backgroundColor === '#003F5E' ? '#FFFFFF' : '#000000';

  const pathname = usePathname(); // 獲取當前路徑

  // 定義需要顯示「新增魚類」按鈕的頁面
  let showAddButton = false;
  if (pathname === "/fish/create" || pathname === "/fish/pickImage") {
    showAddButton = false;
  } else {
    showAddButton = true;
  }

  return (
    <>
      <Stack screenOptions={{
        title: "nivasilan ko a among",
        headerShown: true,
        headerBackButtonDisplayMode: "minimal",
        gestureEnabled: true, // 確保右滑手勢啟用
        gestureDirection: "horizontal", // 水平手勢（右滑）
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerLeft: () => (
              <FontAwesome
                name="home"
                size={26}
                color={iconColor}
                style={{
                  left: 10
                }}
                onPress={() => router.push("/")}
              />
            )
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
            headerLeft: () => (
              <FontAwesome
                name="arrow-left"
                size={20}
                color={iconColor}
                style={{
                  left: 10
                }}
                onPress={() => {
                  setImageUriForAll("");
                  router.push("/fish/pickImage");
                }}
              />
            )
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            href: null,
            headerLeft: () => (
              <FontAwesome
                name="arrow-left"
                size={20}
                color={iconColor}
                style={{
                  left: 10
                }}
                onPress={() => router.push("/fish")}
              />
            )
          }}
        />
        <Stack.Screen
          name="pickImage"
          options={{
            title: "",
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="plus" color={iconColor} />,
            tabBarStyle: { display: "none" },
            headerRight: () => (
              <Button
                onPress={() => {
                  if (imageUriForAll === "" || imageUriForAll === null) {
                    alert('請先選擇一張圖片!');
                  } else {
                    router.push("/fish/create")
                  }
                }}
                title="下一步"
                color={iconColor}
              />
            ),
            headerLeft: () => (
              <FontAwesome
                name="times"
                size={32}
                color={iconColor}
                style={{
                  left: 10
                }}
                onPress={() => {
                  setImageUriForAll("");
                  router.push("/fish");
                }}
              />
            )
          }}
        />
      </Stack>
      {showAddButton && (
        <View style={[styles.tabBar, { backgroundColor: backgroundColor }]}>
          <TouchableOpacity
            onPress={() => router.push("/fish/pickImage")}
            style={styles.addButton}
          >
            <FontAwesome name="plus" size={24} color={iconColor} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );

}
const styles = StyleSheet.create({
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
  addButton: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // 輕微背景，視設計調整
    borderRadius: 30,
  },
});
