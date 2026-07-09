import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppModal from "../common/app-modal";
import { SectionBlock } from "./section-block";

type TariffNotesSectionProps = {
  notes: string;
};
const TariffNotesSection = ({ notes }: TariffNotesSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SectionBlock title="Tariff Notes">
      <Text className="text-sm leading-6 text-zinc-700 mb-5 line-clamp-5">
        {notes}
      </Text>
      <TouchableOpacity className="self-start rounded-full border border-zinc-900 px-5 py-2 mb-5">
        <Text
          className="text-sm font-semibold text-zinc-950"
          onPress={() => setOpen(true)}
        >
          Read More
        </Text>
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
