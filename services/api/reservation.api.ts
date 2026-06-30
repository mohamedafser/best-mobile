import { ReservationsResponse } from "@/types/reservation.types";
import { GET } from "./api";

export const getReservationApi = (data?: { id: string }) => {
  const idPath = data?.id ? `/${data.id}` : "";

  return GET<ReservationsResponse>(`/reservations${idPath}`);
};

export const getReservationDetailsApi = (data: { id: string }) => {
  const { id } = data;
  const idPath = id ? `/${id}/show` : "";

  return GET<ReservationsResponse>(`/reservations${idPath}`);
};
