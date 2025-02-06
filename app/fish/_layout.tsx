import { Stack } from 'expo-router';
import React from 'react';


export default function StackLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "nivasilan ko a among",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal"
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "nivasilan ko a among",
          headerShown: true,
          headerBackButtonDisplayMode: "minimal"
        }}
      />
    </Stack >
  );
}
