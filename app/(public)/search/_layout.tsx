import AppStackLayout from "@/components/layouts/app-stack-layout";
import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <AppStackLayout>
      <Stack.Screen
        name="index"
        options={{
          title: "Search Results",
        }}
      />
    </AppStackLayout>
  );
}
