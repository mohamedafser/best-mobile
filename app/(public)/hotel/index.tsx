import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HotelsScreen() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#fffbf9]">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-base text-[#424656]">
          Search for a hotel to view details.
        </Text>
      </View>
    </SafeAreaView>
  );
}
