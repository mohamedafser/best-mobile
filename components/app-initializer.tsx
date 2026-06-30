import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUserProfileThunk } from "@/store/slice/user-profile.slice";

export default function AppInitializer() {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, isAuthenticated]);

  return null;
}
