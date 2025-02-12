import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    < Tabs >
      <Tabs.Screen name="/fish/index" options={{ title: "首頁" }} />
      <Tabs.Screen name="search" options={{ title: "搜尋" }} />
      <Tabs.Screen name="profile" options={{ title: "個人頁面" }} />
    </Tabs >
  );
}
