import { Stack } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';
import { useRouter } from 'expo-router';




export default function FishStackLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{
      title: "nivasilan ko a among",
      headerShown: true,
      headerBackButtonDisplayMode: "minimal"
    }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="create"
      />
      <Stack.Screen
        name="upload"
        options={{
          headerRight: () => (
            <Button
              onPress={() => router.push("/fish/upload?triggerUpload=true")}  // 點擊後執行的操作
              title="上傳圖片"
              color="blue"
            />
          ),
        }}
      />
    </Stack >
  );
}
