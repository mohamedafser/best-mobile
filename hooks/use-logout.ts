import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/slice/authSlice";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
  };
  return handleLogout;
};

export default useLogout;
