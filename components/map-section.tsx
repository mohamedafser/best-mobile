import { Ionicons } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SectionBlock } from "./trip-details";

type MapSectionProps = {
  lat: number;
  long: number;
  hotelName: string;
};

const MapSection = (props: MapSectionProps) => {
  return (
    <SectionBlock title="Where you stay">
      <View className="overflow-hidden rounded-2xl border border-zinc-200">
        <MapView
          style={{ height: 100, width: "100%" }}
          initialRegion={{
            latitude: props.lat,
            longitude: props.long,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: props.lat,
              longitude: props.long,
            }}
            title={props.hotelName}
          />
        </MapView>
      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${props.lat},${props.long}`,
          )
        }
        className="mt-4 flex-row items-center justify-center rounded-xl bg-black py-3"
      >
        <Ionicons name="navigate" size={18} color="#fff" />
        <Text className="ml-2 font-semibold text-white">Open in Maps</Text>
      </TouchableOpacity>
    </SectionBlock>
  );
};

export default MapSection;
