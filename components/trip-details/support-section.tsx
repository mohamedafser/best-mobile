import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "../themed-text";
import { SectionBlock } from "./section-block";

const SupportSection = () => {
  const colorScheme = useColorScheme();
  return (
    <SectionBlock title="Get Support">
      <TouchableOpacity
        className="self-start flex-row items-center rounded-full border px-5 py-2"
        style={{ borderColor: Colors[colorScheme as "dark" | "light"].gray100 }}
      >
        <MaterialCommunityIcons
          name="headset"
          size={18}
          color={Colors[colorScheme as "dark" | "light"].gray100}
        />
        <ThemedText className="ml-2 text-sm font-semibold">
          Contact Support
        </ThemedText>
      </TouchableOpacity>
    </SectionBlock>
  );
};
export default SupportSection;
