import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { SectionBlock } from "./section-block";

const SupportSection = () => (
  <SectionBlock title="Get Support">
    <TouchableOpacity className="self-start flex-row items-center rounded-full border border-zinc-900 px-5 py-2">
      <MaterialCommunityIcons name="headset" size={18} color="#111" />
      <Text className="ml-2 text-sm font-semibold text-zinc-950">
        Contact Support
      </Text>
    </TouchableOpacity>
  </SectionBlock>
);
export default SupportSection;
