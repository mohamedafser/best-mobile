import AppStackLayout from "@/components/layouts/app-stack-layout";
import { Stack } from "expo-router";

export default function HotelLayout() {
  return (
    <AppStackLayout>
      <Stack.Screen
        name="index"
        options={{
          title: "Hotels",
        }}
      />
      <Stack.Screen
        name="[country-code]/[slug]/index"
        options={{
          title: "View hotel",
        }}
      />
    </AppStackLayout>
  );
}
