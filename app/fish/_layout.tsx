import React from 'react';
import { Button } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useImage } from '@/context/ImageContext';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function FishStackLayout() {
  const router = useRouter();
  const { imageUriForAll, setImageUriForAll } = useImage();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#003F5E' : '#FFFFFF';
  const iconColor = backgroundColor === '#003F5E' ? '#FFFFFF' : '#000000';

  return (
    <Tabs screenOptions={{
      title: "nivasilan ko a among",
      headerShown: true,
      headerBackButtonDisplayMode: "minimal",
    }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
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
      <Tabs.Screen
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
      <Tabs.Screen
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
                  router.push("/fish/create?isUpload=true")
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
    </Tabs >
  );
}
