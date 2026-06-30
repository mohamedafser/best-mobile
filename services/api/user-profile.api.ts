import { UserProfileApiResponse } from "@/types/user-profile.types";
import { GET } from "./api";

export const getUserProfileApi = () => GET<UserProfileApiResponse>("/me");
