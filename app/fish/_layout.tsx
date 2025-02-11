import { Stack } from 'expo-router';
import React from 'react';


export default function FishStackLayout() {
  return (
    <Stack screenOptions={{
      title: "nivasilan ko a among",
      headerShown: false,
      headerBackButtonDisplayMode: "minimal"
    }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="add"
      />
    </Stack >
  );
}
