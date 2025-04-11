import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/hooks/useColorScheme';


export default function FishStackLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#003F5E' : '#FFFFFF';
  const iconColor = backgroundColor === '#003F5E' ? '#FFFFFF' : '#000000';

  const pathname = usePathname(); // 獲取當前路徑



  // 定義不需要顯示「新增魚類」按鈕的頁面
  const showAddButton = !(
    pathname === "/fish/create" ||
    pathname === "/fish/pickImage" ||
    /^\/fish\/\d+$/.test(pathname) ||
    pathname === "/fish/notes"
  );

  return (
    <>
      <Stack screenOptions={{
        title: "nivasilan ko a among",
        headerTitleAlign: "center",
        headerShown: true,
        headerBackButtonDisplayMode: "minimal",
        gestureEnabled: true, // 確保右滑手勢啟用
        gestureDirection: "horizontal", // 水平手勢（右滑）
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerLeft: () => (
              <></>
            )
          }}
        />
        <Stack.Screen name="create" options={{ title: "新增魚類資料" }} />

        <Stack.Screen name="notes" options={{ title: "新增魚類詳細資料" }} />

        <Stack.Screen name="[id]" options={{ title: "魚類詳細資料" }} />
        <Stack.Screen name="pickImage" options={{ title: "選擇圖片" }} />
      </Stack>
      {showAddButton && (
        <View style={[styles.tabBar, { backgroundColor: backgroundColor }]}>
          <Pressable
            onPress={() => router.push("/fish/pickImage")}
            style={styles.addButton}
          >
            <FontAwesome name="plus" size={24} color={iconColor} />
          </Pressable>
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
  headerButton: {
    padding: 10, // 增加觸控區域
    marginHorizontal: 10, // 與邊緣保持距離
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18, // 文字大小
    fontWeight: "bold", // 文字加粗
  },
});
