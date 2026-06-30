import { CreateReferralType } from "@/types/referrals.types";
import { POST } from "./api";

export const createReferralApi = async (body: CreateReferralType) =>
  POST<any, CreateReferralType>("/referrals", body);
