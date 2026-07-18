import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "./themed-text";

export type Contact = {
  address?: string;
  address_line_2?: string;
  city?: string;
  state?: {
    name?: string;
  };
  country?: string;
  zip_code?: string;
};

interface AddressProps {
  contact?: Contact;
}

const capitalize = (text?: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const Address: React.FC<AddressProps> = ({ contact }) => {
  if (!contact?.address) return null;

  const address = [
    contact.address?.toLowerCase(),
    contact.address_line_2?.toLowerCase(),
    capitalize(contact.city),
    contact.state?.name?.toLowerCase(),
    contact.country?.toLowerCase(),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <View className="flex-row items-start">
      <Ionicons
        name="location-outline"
        size={16}
        color="#6B7280"
        style={{ marginTop: 2 }}
      />

      <ThemedText className="ml-2 flex-1 text-xs capitalize text-zinc-700">
        {address}
        {contact.zip_code ? ` - ${contact.zip_code}` : ""}
      </ThemedText>
    </View>
  );
};

export default Address;
