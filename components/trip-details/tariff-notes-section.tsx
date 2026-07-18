import { Colors } from "@/constants/theme";
import { useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import AppModal from "../common/app-modal";
import { ThemedText } from "../themed-text";
import { SectionBlock } from "./section-block";

type TariffNotesSectionProps = {
  notes: string;
};
const TariffNotesSection = ({ notes }: TariffNotesSectionProps) => {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <SectionBlock title="Tariff Notes">
      <ThemedText className="text-sm leading-6 mb-5 line-clamp-5">
        {notes}
      </ThemedText>
      <TouchableOpacity
        className="self-start rounded-full borderpx-5 py-2 mb-5"
        style={{ borderColor: Colors[colorScheme as "dark" | "light"].gray100 }}
      >
        <ThemedText
          className="text-sm font-semibold "
          onPress={() => setOpen(true)}
        >
          Read More
        </ThemedText>
      </TouchableOpacity>
      <AppModal
        visible={open}
        title="Tariff Notes"
        // description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmText="OK"
        onClose={() => setOpen(false)}
        showCloseIcon={true}
      >
        <View className="max-h-[500px] overflow-y-auto">
          <Text className="text-sm leading-6 text-zinc-700 mb-5">{notes}</Text>
        </View>
      </AppModal>
    </SectionBlock>
  );
};

export default TariffNotesSection;
