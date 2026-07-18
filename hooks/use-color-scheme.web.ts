import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect, useState } from "react";

export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const { colorScheme } = useNativewindColorScheme();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return "light";
  }

  return colorScheme ?? "light";
}
