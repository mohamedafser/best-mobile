import { useColorScheme } from "nativewind";
import { Switch } from "react-native";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return <Switch value={colorScheme === "dark"} onValueChange={toggleTheme} />;
}
