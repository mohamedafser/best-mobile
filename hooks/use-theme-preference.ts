import { useColorScheme } from "nativewind";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setThemePreference,
  ThemePreference,
} from "@/store/slice/theme-slice";

export function useThemePreference() {
  const dispatch = useAppDispatch();
  const preference = useAppSelector((state) => state.theme.preference);
  const { setColorScheme } = useColorScheme();

  const setPreference = (value: ThemePreference) => {
    dispatch(setThemePreference(value));
    setColorScheme(value);
  };

  return { preference, setPreference };
}
