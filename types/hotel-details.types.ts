export interface HotelDetailsResponse {
  success: boolean;
  data: HotelDetails;
}

export interface HotelDetails {
  hotel_id: string;
  name: string;
  contact: HotelContact;
  state: HotelState;
  media: string[];
  local_rating: string;
  amenities: HotelAmenity[];
  policies: HotelPolicy[];
  description: string;
  location: HotelLocation;
  slug_details: SlugDetails;
  highlights: HotelHighlight[];
  is_in_wishlist: boolean;
  nearby_parks: NearbyPark[];
  params: HotelParams;
}

export interface HotelContact {
  address: string;
  address_line_2: string | null;
  city: string;
  state: ContactState;
  country: string;
  zip_code: string;
  phone: string;
}

export interface ContactState {
  uuid: string;
  name: string;
  code: string;
}

export interface HotelState {
  name: string;
  uuid: string;
}

export interface HotelAmenity {
  code: string;
  name: string;
}

export interface HotelPolicy {
  header: string;
  value: string;
}

export interface HotelLocation {
  latitude: string;
  longitude: string;
}

export interface SlugDetails {
  uuid: string;
  property_code: string;
  country_code: string;
  name: string;
  slug: string;
}

export interface HotelHighlight {
  header: string;
  description: string;
}

// No structure is available from the provided response yet.
export type NearbyPark = unknown;

export interface HotelParams {
  hotel_id: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  roomQuantity: string;
  backSlug: string;
}

export type HotelDetailsQueryParams = {
  propertyId: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: string | number;
  roomQuantity?: string | number;
  backSlug?: string;
};
