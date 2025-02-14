import React from 'react';
import { Button } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function FishStackLayout() {
  const router = useRouter();


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
              name="times"
              size={32}
              color="black"
              style={{
                left: 10
              }}
              onPress={() => router.push("/fish")}
            />
          )
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
              onPress={() => router.push("/fish/create")}
              title="下一步"
              color="blue"
            />
          ),
          headerLeft: () => (
            <FontAwesome
              name="times"
              size={32}
              color="black"
              style={{
                left: 10
              }}
              onPress={() => router.push("/fish")}
            />
          )
        }}
      />
    </Tabs >
  );
}
