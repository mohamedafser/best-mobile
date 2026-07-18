import { useColorScheme } from "nativewind";
import { useEffect } from "react";

import { useAppSelector } from "@/hooks/redux";

export default function ThemeInitializer() {
  const preference = useAppSelector((state) => state.theme.preference);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(preference);
  }, [preference, setColorScheme]);

  return null;
}
