import { Image, Text, View } from "react-native";

type AvatarProps = {
  image?: string;
  name?: string;
  size?: number;
  className?: string;
};

const Avatar = ({
  image,
  name = "",
  size = 48,
  className = "",
}: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <Image
        source={{ uri: image }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        className={className}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      className={`items-center justify-center bg-gray-700 dark:bg-gray-300 ${className}`}
    >
      <Text
        style={{ fontSize: size * 0.35 }}
        className="font-semibold text-white dark:text-black"
      >
        {initials}
      </Text>
    </View>
  );
};

export default Avatar;
