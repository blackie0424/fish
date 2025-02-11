import { Stack } from 'expo-router';
import React from 'react';

export default function tabsStackLayout() {

  return (
    <Stack screenOptions={
      {
        title: "nivasilan ko a among",
        headerShown: false,
        headerBackButtonDisplayMode: "minimal"
      }
    }>
      <Stack.Screen
        name="index"
      />
    </Stack>
  );
}
