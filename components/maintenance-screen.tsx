import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./themed-text";

type MaintenanceScreenProps = {
  title?: string;
  description?: string;
  estimatedTime?: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
};

export default function MaintenanceScreen({
  title = "We’ll be back soon",
  description = "Our app is currently undergoing scheduled maintenance. Please check back again shortly.",
  estimatedTime,
  showRetryButton = true,
  onRetry,
}: MaintenanceScreenProps) {
  const colorScheme = useColorScheme();
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }

    router.replace("/");
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: Colors[colorScheme as "light" | "dark"].surfacePage,
      }}
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-indigo-50">
          <Ionicons name="construct-outline" size={56} color="#4f46e5" />
        </View>

        <ThemedText className="text-center text-slate-900" type="3xlBold">
          {title}
        </ThemedText>

        <Text className="mt-4 max-w-md text-center text-base leading-6 text-slate-500">
          {description}
        </Text>

        {estimatedTime ? (
          <View className="mt-6 flex-row items-center rounded-full bg-slate-100 px-4 py-2">
            <Ionicons name="time-outline" size={18} color="#475569" />

            <Text className="ml-2 text-sm font-medium text-slate-600">
              Estimated time: {estimatedTime}
            </Text>
          </View>
        ) : null}

        {showRetryButton ? (
          <Pressable
            onPress={handleRetry}
            className="mt-10 w-full max-w-sm items-center rounded-xl bg-indigo-600 px-6 py-4 active:bg-indigo-700"
          >
            <Text className="text-base font-semibold text-white">
              Try again
            </Text>
          </Pressable>
        ) : null}

        <Text className="mt-6 text-center text-sm text-slate-400">
          Thank you for your patience.
        </Text>
      </View>
    </SafeAreaView>
  );
}
