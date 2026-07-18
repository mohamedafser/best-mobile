import AppStackLayout from "@/components/layouts/app-stack-layout";
import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <AppStackLayout>
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="profile/update-password"
        options={{
          title: "Update Password",
        }}
      />

      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </AppStackLayout>
  );
}
