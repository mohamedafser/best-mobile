import AppStackLayout from "@/components/layouts/app-stack-layout";
import { Stack } from "expo-router";

export default function TripDetailsLayout() {
  return (
    <AppStackLayout>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Trip details",
        }}
      />
    </AppStackLayout>
  );
}
