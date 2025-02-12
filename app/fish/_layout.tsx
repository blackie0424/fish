import React from 'react';
import { Button } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function FishStackLayout() {
  const router = useRouter();
  const pathname = usePathname();


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
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="plus" color="black" />,
          tabBarStyle: { display: "none" },
          headerRight: () => (
            <Button
              onPress={() => router.push("/fish/upload?triggerUpload=true")}  // 點擊後執行的操作
              title="下一步"
              color="blue"
            />
          ),
        }}
      />
    </Tabs >
  );
}
