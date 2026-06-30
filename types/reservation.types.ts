/* Auto-generated from uploaded reservation JSON. */
export type Nullable<T> = T | null;

export interface ReservationResponseParams {
  state: string;
  adults: number;
  backSlug: string;
  children: number;
  cityName: string;
  hotel_id: string;
  offer_id: string;
  childAges: unknown[];
  productId: string;
  checkInDate: string;
  checkOutDate: string;
  roomQuantity: number;
  roomTypeCode: string;
  rateBasisRunno: string;
  providerRateKey: string;
  allocationDetails: string;
  selectedRateBasis: string;
  passengerNationality: string;
  wedbeds_currency_code: string;
  allocationDetailsByRoom: string[];
  passengerCountryOfResidence: string;
}

export interface ReservationResponseRoomRoomTypeEstimated {
  beds?: null;
  bedType?: null;
  category?: null;
}

export interface ReservationResponseRoomRoom {
  type: string;
  title: string;
  bedding?: null;
  category?: null;
  amenities: unknown[];
  type_estimated: ReservationResponseRoomRoomTypeEstimated;
}

export interface ReservationResponseRoomPrice {
  base: string;
  total: string;
  currency: string;
}

export interface ReservationResponseRoomTaxes {
  includedTaxes: unknown[];
  payAtHotelTaxes: unknown[];
  notIncludedTaxes: unknown[];
}

export interface ReservationResponseRoomGuests {
  adults: number;
  children: unknown[];
}

export interface ReservationResponseRoomPricingFree {
  tax: number;
  currency: string;
  coins_earned: number;
  source_price: number;
  display_price: number;
  selling_price: number;
  cashback_amount: number;
  per_night_total: number;
  cashback_percentage: number;
}

export interface ReservationResponseRoomPricingGold {
  tax: number;
  currency: string;
  coins_earned: number;
  source_price: number;
  display_price: number;
  selling_price: number;
  cashback_amount: number;
  per_night_total: number;
  cashback_percentage: number;
}

export interface ReservationResponseRoomPricing {
  tax: number;
  free: ReservationResponseRoomPricingFree;
  gold: ReservationResponseRoomPricingGold;
  paid: number;
  applicable: string;
}

export interface ReservationResponseRoomRefunds {
  amount: number;
  currency: string;
  refundable: boolean;
  description: string;
  refundable_until: string;
  ama_refund_amount: number;
  best_refund_amount: number;
  refundable_until_iso: string;
  charge_after_deadline: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItem {
  charge: ReservationResponseRoomPoliciesCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseRoomPoliciesCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseRoomPoliciesCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItem2 {
  charge: ReservationResponseRoomPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseRoomPoliciesCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseRoomPoliciesCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesRuleItem3 {
  charge: ReservationResponseRoomPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomPoliciesCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseRoomPoliciesCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseRoomPoliciesCancellationRules {
  rule: (
    | ReservationResponseRoomPoliciesCancellationRulesRuleItem
    | ReservationResponseRoomPoliciesCancellationRulesRuleItem2
    | ReservationResponseRoomPoliciesCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseRoomPoliciesCancellationRulesAttributes;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleCharge {
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleAmendCharge {
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleCancelCharge {
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRule {
  runno: string;
  charge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleCharge;
  toDate: string;
  amendCharge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleAmendCharge;
  cancelCharge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleCancelCharge;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleAmendCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRuleCancelCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRule2 {
  runno: string;
  charge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  amendCharge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleAmendCharge2;
  cancelCharge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleCancelCharge2;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictionsRule3 {
  runno: string;
  charge: ReservationResponseRoomPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  noShowPolicy: string;
}

export interface ReservationResponseRoomPoliciesCancellationRestrictions {
  rules: (
    | ReservationResponseRoomPoliciesCancellationRestrictionsRule
    | ReservationResponseRoomPoliciesCancellationRestrictionsRule2
    | ReservationResponseRoomPoliciesCancellationRestrictionsRule3
  )[];
  withinCancellationDeadline: string;
}

export interface ReservationResponseRoomPolicies {
  tariff_notes: string;
  cancellation_rules: ReservationResponseRoomPoliciesCancellationRules;
  tariff_note_messages: string[];
  cancellation_restrictions: ReservationResponseRoomPoliciesCancellationRestrictions;
}

export interface ReservationResponseRoomOccupancyRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomOccupancy {
  room_info: ReservationResponseRoomOccupancyRoomInfo;
  room_runno: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesDateIncluding {
  "@attributes": ReservationResponseRoomWedbedsBlockRateDatesDateIncludingAttributes;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesDate {
  price: ReservationResponseRoomWedbedsBlockRateDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseRoomWedbedsBlockRateDatesDateIncluding;
  "@attributes": ReservationResponseRoomWedbedsBlockRateDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDatesAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockRateDates {
  date: ReservationResponseRoomWedbedsBlockRateDatesDate;
  "@attributes": ReservationResponseRoomWedbedsBlockRateDatesAttributes;
}

export interface ReservationResponseRoomWedbedsBlockRateRateTypeAttributes {
  currencyid: string;
  description: string;
  currencyshort: string;
}

export interface ReservationResponseRoomWedbedsBlockRateRateType {
  "#text": string;
  "@attributes": ReservationResponseRoomWedbedsBlockRateRateTypeAttributes;
}

export interface ReservationResponseRoomWedbedsBlockRateRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomWedbedsBlockRateAttributes {
  id: string;
  runno: string;
  description: string;
}

export interface ReservationResponseRoomWedbedsBlockRateRoomOccupancy {
  maxAdult: string;
  _room_runno: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  _room_adults: string;
  maxOccupancy: string;
  _room_children: string;
  _room_extrabeds: string;
  _room_children_ages: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomWedbedsBlockRateSpecialsApplied {
  special: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem {
  charge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem2 {
  charge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem3 {
  charge: ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockRateCancellationRules {
  rule: (
    | ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem
    | ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem2
    | ReservationResponseRoomWedbedsBlockRateCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseRoomWedbedsBlockRateCancellationRulesAttributes;
}

export interface ReservationResponseRoomWedbedsBlockRateSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseRoomWedbedsBlockRatePromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseRoomWedbedsBlockRate {
  id: string;
  dates: ReservationResponseRoomWedbedsBlockRateDates;
  total: string;
  status: string;
  minStay: unknown[];
  rateType: ReservationResponseRoomWedbedsBlockRateRateType;
  _hotel_id: string;
  onRequest: string;
  _room_info: ReservationResponseRoomWedbedsBlockRateRoomInfo;
  _room_name: string;
  isBookable: string;
  leftToSell: string;
  totalTaxes: string;
  "@attributes": ReservationResponseRoomWedbedsBlockRateAttributes;
  _allow_book: string;
  _room_runno: string;
  description: string;
  tariffNotes: string;
  _property_fees: unknown[];
  _room_occupancy: ReservationResponseRoomWedbedsBlockRateRoomOccupancy;
  _room_type_code: string;
  specialsApplied: ReservationResponseRoomWedbedsBlockRateSpecialsApplied;
  _room_type_runno: string;
  allowsExtraMeals: string;
  dateApplyMinStay: unknown[];
  _rate_basis_runno: string;
  allocationDetails: string;
  cancellationRules: ReservationResponseRoomWedbedsBlockRateCancellationRules;
  extraBedOnRequest: string;
  _provider_rate_key: string;
  _special_promotions: ReservationResponseRoomWedbedsBlockRateSpecialPromotion[];
  allowsSpecialRequests: string;
  allowsBeddingPreference: string;
  _promotion_daily_breakdown: ReservationResponseRoomWedbedsBlockRatePromotionDailyBreakdownItem[];
  withinCancellationDeadline: string;
  passengerNamesRequiredForBooking: string;
}

export interface ReservationResponseRoomWedbedsBlockDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockDatesDateIncluding {
  "@attributes": ReservationResponseRoomWedbedsBlockDatesDateIncludingAttributes;
}

export interface ReservationResponseRoomWedbedsBlockDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseRoomWedbedsBlockDatesDate {
  price: ReservationResponseRoomWedbedsBlockDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseRoomWedbedsBlockDatesDateIncluding;
  "@attributes": ReservationResponseRoomWedbedsBlockDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseRoomWedbedsBlockDatesAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockDates {
  date: ReservationResponseRoomWedbedsBlockDatesDate;
  "@attributes": ReservationResponseRoomWedbedsBlockDatesAttributes;
}

export interface ReservationResponseRoomWedbedsBlockTaxes {
  includedTaxes: unknown[];
  payAtHotelTaxes: unknown[];
  notIncludedTaxes: unknown[];
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem {
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem2 {
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem3 {
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRules {
  rule: (
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem2
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseRoomWedbedsBlockPoliciesCancellationRulesAttributes;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge {
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge {
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge {
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule {
  runno: string;
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge;
  toDate: string;
  amendCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge;
  cancelCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule2 {
  runno: string;
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  amendCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge2;
  cancelCharge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge2;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule3 {
  runno: string;
  charge: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  noShowPolicy: string;
}

export interface ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictions {
  rules: (
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule2
    | ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictionsRule3
  )[];
  withinCancellationDeadline: string;
}

export interface ReservationResponseRoomWedbedsBlockPolicies {
  tariff_notes: string;
  cancellation_rules: ReservationResponseRoomWedbedsBlockPoliciesCancellationRules;
  tariff_note_messages: string[];
  cancellation_restrictions: ReservationResponseRoomWedbedsBlockPoliciesCancellationRestrictions;
}

export interface ReservationResponseRoomWedbedsBlockOccupancyRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomWedbedsBlockOccupancy {
  room_info: ReservationResponseRoomWedbedsBlockOccupancyRoomInfo;
  room_runno: string;
}

export interface ReservationResponseRoomWedbedsBlock {
  rate: ReservationResponseRoomWedbedsBlockRate;
  dates: ReservationResponseRoomWedbedsBlockDates;
  taxes: ReservationResponseRoomWedbedsBlockTaxes;
  total: string;
  status: string;
  currency: string;
  policies: ReservationResponseRoomWedbedsBlockPolicies;
  occupancy: ReservationResponseRoomWedbedsBlockOccupancy;
  allow_book: string;
  blocked_at: string;
  on_request: string;
  product_id: string;
  is_bookable: string;
  room_type_code: string;
  room_type_runno: string;
  rate_basis_runno: string;
  provider_currency: string;
  provider_rate_key: string;
  allocation_details: string;
  selected_rate_basis: string;
  allocation_details_by_room: string[];
  passenger_names_required_for_booking: string;
}

export interface ReservationResponseRoomProviderOfferHotel {
  name: string;
  address: string;
  property_code: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesDateIncluding {
  "@attributes": ReservationResponseRoomProviderOfferRateBasisDatesDateIncludingAttributes;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesDate {
  price: ReservationResponseRoomProviderOfferRateBasisDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseRoomProviderOfferRateBasisDatesDateIncluding;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDatesAttributes {
  count: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisDates {
  date: ReservationResponseRoomProviderOfferRateBasisDatesDate;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisDatesAttributes;
}

export interface ReservationResponseRoomProviderOfferRateBasisRateTypeAttributes {
  currencyid: string;
  description: string;
  currencyshort: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisRateType {
  "#text": string;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisRateTypeAttributes;
}

export interface ReservationResponseRoomProviderOfferRateBasisRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisAttributes {
  id: string;
  runno: string;
  description: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisRoomOccupancy {
  maxAdult: string;
  _room_runno: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  _room_adults: string;
  maxOccupancy: string;
  _room_children: string;
  _room_extrabeds: string;
  _room_children_ages: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisSpecialsApplied {
  special: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem {
  charge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem2 {
  charge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem3 {
  charge: ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisCancellationRules {
  rule: (
    | ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem
    | ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem2
    | ReservationResponseRoomProviderOfferRateBasisCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseRoomProviderOfferRateBasisCancellationRulesAttributes;
}

export interface ReservationResponseRoomProviderOfferRateBasisSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseRoomProviderOfferRateBasisPromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseRoomProviderOfferRateBasis {
  id: string;
  dates: ReservationResponseRoomProviderOfferRateBasisDates;
  total: string;
  status: string;
  minStay: unknown[];
  rateType: ReservationResponseRoomProviderOfferRateBasisRateType;
  _hotel_id: string;
  onRequest: string;
  productId: string;
  _room_info: ReservationResponseRoomProviderOfferRateBasisRoomInfo;
  _room_name: string;
  isBookable: string;
  leftToSell: string;
  totalTaxes: string;
  "@attributes": ReservationResponseRoomProviderOfferRateBasisAttributes;
  _allow_book: string;
  _product_id: string;
  _room_runno: string;
  description: string;
  tariffNotes: string;
  _property_fees: unknown[];
  _room_occupancy: ReservationResponseRoomProviderOfferRateBasisRoomOccupancy;
  _room_type_code: string;
  providerRateKey: string;
  specialsApplied: ReservationResponseRoomProviderOfferRateBasisSpecialsApplied;
  _room_type_runno: string;
  allowsExtraMeals: string;
  dateApplyMinStay: unknown[];
  _rate_basis_runno: string;
  allocationDetails: string;
  cancellationRules: ReservationResponseRoomProviderOfferRateBasisCancellationRules;
  extraBedOnRequest: string;
  _provider_rate_key: string;
  _special_promotions: ReservationResponseRoomProviderOfferRateBasisSpecialPromotion[];
  allowsSpecialRequests: string;
  allowsBeddingPreference: string;
  _promotion_daily_breakdown: ReservationResponseRoomProviderOfferRateBasisPromotionDailyBreakdownItem[];
  withinCancellationDeadline: string;
  passengerNamesRequiredForBooking: string;
}

export interface ReservationResponseRoomProviderOffer {
  hotel: ReservationResponseRoomProviderOfferHotel;
  rate_basis: ReservationResponseRoomProviderOfferRateBasis;
}

export interface ReservationResponseRoomSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseRoomWedbedsBookingPayloadRoom {
  children: unknown[];
  rateBasis: number;
  adultsCode: number;
  passengerNationality: string;
  passengerCountryOfResidence: string;
}

export interface ReservationResponseRoomWedbedsBookingPayload {
  rooms: ReservationResponseRoomWedbedsBookingPayloadRoom[];
  toDate: string;
  currency: string;
  fromDate: string;
  hotelCode: string;
  productId: string;
}

export interface ReservationResponseRoomPromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseRoom {
  room: ReservationResponseRoomRoom;
  price: ReservationResponseRoomPrice;
  taxes: ReservationResponseRoomTaxes;
  guests: ReservationResponseRoomGuests;
  pricing: ReservationResponseRoomPricing;
  refunds: ReservationResponseRoomRefunds;
  offer_id: string;
  policies: ReservationResponseRoomPolicies;
  provider: string;
  occupancy: ReservationResponseRoomOccupancy;
  rate_code: string;
  board_type: string;
  commission?: null;
  rate_basis: string;
  check_in_date: string;
  wedbeds_block: ReservationResponseRoomWedbedsBlock;
  check_out_date: string;
  provider_offer: ReservationResponseRoomProviderOffer;
  promotion_labels: string[];
  promotion_summary: string;
  special_promotions: ReservationResponseRoomSpecialPromotion[];
  wedbeds_booking_payload: ReservationResponseRoomWedbedsBookingPayload;
  promotion_daily_breakdown: ReservationResponseRoomPromotionDailyBreakdownItem[];
}

export interface ReservationResponseProviderResponse {
  id: string;
  type?: null;
  self?: null;
  hotelBookings: unknown[];
  guests: unknown[];
  associatedRecords: unknown[];
}

export interface ReservationResponseOrderBookingDetails {
  trip_start: string;
  trip_end: string;
  guest: string;
  reservation_room_type: string;
}

export interface ReservationResponseOrderBookedBy {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  auth_provider: string;
  is_onboarding_complete: number;
  pending_email?: null;
  is_email_update_pending: boolean;
}

export interface ReservationResponseOrderHotelContactState {
  uuid: string;
  name: string;
  code?: null;
}

export interface ReservationResponseOrderHotelContact {
  address: string;
  address_line_2?: null;
  city: string;
  state: ReservationResponseOrderHotelContactState;
  country: string;
  zip_code: string;
  phone: string;
}

export interface ReservationResponseOrderHotelLocation {
  latitude: number;
  longitude: number;
}

export interface ReservationResponseOrderHotel {
  name: string;
  images: string[];
  contact: ReservationResponseOrderHotelContact;
  location: ReservationResponseOrderHotelLocation;
  rating?: null;
}

export interface ReservationResponseOrderPaymentDetailsTotalAmount {
  amount: number;
  currency: string;
}

export interface ReservationResponseOrderPaymentDetails {
  date: string;
  reference_number: string;
  payment_method: string;
  payment_status: string;
  paid_at: string;
  paid_via: string;
  paid_card_brand: string;
  totalAmount: ReservationResponseOrderPaymentDetailsTotalAmount;
}

export interface ReservationResponseOrderRewardsCoinValue {
  amount: number;
  currency: string;
}

export interface ReservationResponseOrderRewards {
  coins: number;
  coin_value: ReservationResponseOrderRewardsCoinValue;
}

export interface ReservationResponseOrderRoomRoomTypeEstimated {
  beds?: null;
  bedType?: null;
  category?: null;
}

export interface ReservationResponseOrderRoomRoom {
  type: string;
  title: string;
  bedding?: null;
  category?: null;
  amenities: unknown[];
  type_estimated: ReservationResponseOrderRoomRoomTypeEstimated;
}

export interface ReservationResponseOrderRoomPrice {
  base: string;
  total: string;
  currency: string;
}

export interface ReservationResponseOrderRoomTaxes {
  includedTaxes: unknown[];
  payAtHotelTaxes: unknown[];
  notIncludedTaxes: unknown[];
}

export interface ReservationResponseOrderRoomGuests {
  adults: number;
  children: unknown[];
}

export interface ReservationResponseOrderRoomPricingFree {
  tax: number;
  currency: string;
  coins_earned: number;
  source_price: number;
  display_price: number;
  selling_price: number;
  cashback_amount: number;
  per_night_total: number;
  cashback_percentage: number;
}

export interface ReservationResponseOrderRoomPricingGold {
  tax: number;
  currency: string;
  coins_earned: number;
  source_price: number;
  display_price: number;
  selling_price: number;
  cashback_amount: number;
  per_night_total: number;
  cashback_percentage: number;
}

export interface ReservationResponseOrderRoomPricing {
  tax: number;
  free: ReservationResponseOrderRoomPricingFree;
  gold: ReservationResponseOrderRoomPricingGold;
  paid: number;
  applicable: string;
}

export interface ReservationResponseOrderRoomRefunds {
  amount: number;
  currency: string;
  refundable: boolean;
  description: string;
  refundable_until: string;
  ama_refund_amount: number;
  best_refund_amount: number;
  refundable_until_iso: string;
  charge_after_deadline: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem {
  charge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem2 {
  charge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem3 {
  charge: ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomPoliciesCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRules {
  rule: (
    | ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem
    | ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem2
    | ReservationResponseOrderRoomPoliciesCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseOrderRoomPoliciesCancellationRulesAttributes;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleAmendCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCancelCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule {
  runno: string;
  charge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCharge;
  toDate: string;
  amendCharge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleAmendCharge;
  cancelCharge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCancelCharge;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleAmendCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCancelCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule2 {
  runno: string;
  charge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  amendCharge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCancelCharge2;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule3 {
  runno: string;
  charge: ReservationResponseOrderRoomPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  noShowPolicy: string;
}

export interface ReservationResponseOrderRoomPoliciesCancellationRestrictions {
  rules: (
    | ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule
    | ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule2
    | ReservationResponseOrderRoomPoliciesCancellationRestrictionsRule3
  )[];
  withinCancellationDeadline: string;
}

export interface ReservationResponseOrderRoomPolicies {
  tariff_notes: string;
  cancellation_rules: ReservationResponseOrderRoomPoliciesCancellationRules;
  tariff_note_messages: string[];
  cancellation_restrictions: ReservationResponseOrderRoomPoliciesCancellationRestrictions;
}

export interface ReservationResponseOrderRoomOccupancyRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomOccupancy {
  room_info: ReservationResponseOrderRoomOccupancyRoomInfo;
  room_runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesDateIncluding {
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateDatesDateIncludingAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesDate {
  price: ReservationResponseOrderRoomWedbedsBlockRateDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseOrderRoomWedbedsBlockRateDatesDateIncluding;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDatesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateDates {
  date: ReservationResponseOrderRoomWedbedsBlockRateDatesDate;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateDatesAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateRateTypeAttributes {
  currencyid: string;
  description: string;
  currencyshort: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateRateType {
  "#text": string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateRateTypeAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateAttributes {
  id: string;
  runno: string;
  description: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateRoomOccupancy {
  maxAdult: string;
  _room_runno: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  _room_adults: string;
  maxOccupancy: string;
  _room_children: string;
  _room_extrabeds: string;
  _room_children_ages: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateSpecialsApplied {
  special: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem {
  charge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem2 {
  charge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem3 {
  charge: ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateCancellationRules {
  rule: (
    | ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem
    | ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem2
    | ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateCancellationRulesAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockRateSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRatePromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockRate {
  id: string;
  dates: ReservationResponseOrderRoomWedbedsBlockRateDates;
  total: string;
  status: string;
  minStay: unknown[];
  rateType: ReservationResponseOrderRoomWedbedsBlockRateRateType;
  _hotel_id: string;
  onRequest: string;
  _room_info: ReservationResponseOrderRoomWedbedsBlockRateRoomInfo;
  _room_name: string;
  isBookable: string;
  leftToSell: string;
  totalTaxes: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockRateAttributes;
  _allow_book: string;
  _room_runno: string;
  description: string;
  tariffNotes: string;
  _property_fees: unknown[];
  _room_occupancy: ReservationResponseOrderRoomWedbedsBlockRateRoomOccupancy;
  _room_type_code: string;
  specialsApplied: ReservationResponseOrderRoomWedbedsBlockRateSpecialsApplied;
  _room_type_runno: string;
  allowsExtraMeals: string;
  dateApplyMinStay: unknown[];
  _rate_basis_runno: string;
  allocationDetails: string;
  cancellationRules: ReservationResponseOrderRoomWedbedsBlockRateCancellationRules;
  extraBedOnRequest: string;
  _provider_rate_key: string;
  _special_promotions: ReservationResponseOrderRoomWedbedsBlockRateSpecialPromotion[];
  allowsSpecialRequests: string;
  allowsBeddingPreference: string;
  _promotion_daily_breakdown: ReservationResponseOrderRoomWedbedsBlockRatePromotionDailyBreakdownItem[];
  withinCancellationDeadline: string;
  passengerNamesRequiredForBooking: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesDateIncluding {
  "@attributes": ReservationResponseOrderRoomWedbedsBlockDatesDateIncludingAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesDate {
  price: ReservationResponseOrderRoomWedbedsBlockDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseOrderRoomWedbedsBlockDatesDateIncluding;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDatesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockDates {
  date: ReservationResponseOrderRoomWedbedsBlockDatesDate;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockDatesAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockTaxes {
  includedTaxes: unknown[];
  payAtHotelTaxes: unknown[];
  notIncludedTaxes: unknown[];
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem {
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem2 {
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem3 {
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRules {
  rule: (
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem2
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRulesAttributes;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge {
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule {
  runno: string;
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge;
  toDate: string;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge2 {
  amount: string;
  formatted: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule2 {
  runno: string;
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  amendCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCancelCharge2;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule3 {
  runno: string;
  charge: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRuleCharge2;
  fromDate: string;
  noShowPolicy: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictions {
  rules: (
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule2
    | ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictionsRule3
  )[];
  withinCancellationDeadline: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockPolicies {
  tariff_notes: string;
  cancellation_rules: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRules;
  tariff_note_messages: string[];
  cancellation_restrictions: ReservationResponseOrderRoomWedbedsBlockPoliciesCancellationRestrictions;
}

export interface ReservationResponseOrderRoomWedbedsBlockOccupancyRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomWedbedsBlockOccupancy {
  room_info: ReservationResponseOrderRoomWedbedsBlockOccupancyRoomInfo;
  room_runno: string;
}

export interface ReservationResponseOrderRoomWedbedsBlock {
  rate: ReservationResponseOrderRoomWedbedsBlockRate;
  dates: ReservationResponseOrderRoomWedbedsBlockDates;
  taxes: ReservationResponseOrderRoomWedbedsBlockTaxes;
  total: string;
  status: string;
  currency: string;
  policies: ReservationResponseOrderRoomWedbedsBlockPolicies;
  occupancy: ReservationResponseOrderRoomWedbedsBlockOccupancy;
  allow_book: string;
  blocked_at: string;
  on_request: string;
  product_id: string;
  is_bookable: string;
  room_type_code: string;
  room_type_runno: string;
  rate_basis_runno: string;
  provider_currency: string;
  provider_rate_key: string;
  allocation_details: string;
  selected_rate_basis: string;
  allocation_details_by_room: string[];
  passenger_names_required_for_booking: string;
}

export interface ReservationResponseOrderRoomProviderOfferHotel {
  name: string;
  address: string;
  property_code: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesDatePrice {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesDateIncludingAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesDateIncluding {
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisDatesDateIncludingAttributes;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesDateAttributes {
  day: string;
  wday: string;
  runno: string;
  datetime: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesDate {
  price: ReservationResponseOrderRoomProviderOfferRateBasisDatesDatePrice;
  discount: string;
  freeStay: string;
  including: ReservationResponseOrderRoomProviderOfferRateBasisDatesDateIncluding;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisDatesDateAttributes;
  dayOnRequest: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDatesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisDates {
  date: ReservationResponseOrderRoomProviderOfferRateBasisDatesDate;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisDatesAttributes;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisRateTypeAttributes {
  currencyid: string;
  description: string;
  currencyshort: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisRateType {
  "#text": string;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisRateTypeAttributes;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisRoomInfo {
  maxAdult: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  maxOccupancy: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisAttributes {
  id: string;
  runno: string;
  description: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisRoomOccupancy {
  maxAdult: string;
  _room_runno: string;
  maxChildAge: string;
  maxChildren: string;
  maxExtraBed: string;
  minChildAge: string;
  _room_adults: string;
  maxOccupancy: string;
  _room_children: string;
  _room_extrabeds: string;
  _room_children_ages: string;
  maxAdultWithChildren: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisSpecialsApplied {
  special: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes {
  runno: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem {
  charge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCharge;
  toDate: string;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes;
  amendCharge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge;
  cancelCharge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge;
  toDateDetails: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes2 {
  runno: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge2 {
  "#text": string;
  formatted: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem2 {
  charge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes2;
  amendCharge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAmendCharge2;
  cancelCharge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCancelCharge2;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes3 {
  runno: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem3 {
  charge: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemCharge2;
  fromDate: string;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItemAttributes3;
  noShowPolicy: string;
  fromDateDetails: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesAttributes {
  count: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisCancellationRules {
  rule: (
    | ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem
    | ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem2
    | ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesRuleItem3
  )[];
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisCancellationRulesAttributes;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasisPromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseOrderRoomProviderOfferRateBasis {
  id: string;
  dates: ReservationResponseOrderRoomProviderOfferRateBasisDates;
  total: string;
  status: string;
  minStay: unknown[];
  rateType: ReservationResponseOrderRoomProviderOfferRateBasisRateType;
  _hotel_id: string;
  onRequest: string;
  productId: string;
  _room_info: ReservationResponseOrderRoomProviderOfferRateBasisRoomInfo;
  _room_name: string;
  isBookable: string;
  leftToSell: string;
  totalTaxes: string;
  "@attributes": ReservationResponseOrderRoomProviderOfferRateBasisAttributes;
  _allow_book: string;
  _product_id: string;
  _room_runno: string;
  description: string;
  tariffNotes: string;
  _property_fees: unknown[];
  _room_occupancy: ReservationResponseOrderRoomProviderOfferRateBasisRoomOccupancy;
  _room_type_code: string;
  providerRateKey: string;
  specialsApplied: ReservationResponseOrderRoomProviderOfferRateBasisSpecialsApplied;
  _room_type_runno: string;
  allowsExtraMeals: string;
  dateApplyMinStay: unknown[];
  _rate_basis_runno: string;
  allocationDetails: string;
  cancellationRules: ReservationResponseOrderRoomProviderOfferRateBasisCancellationRules;
  extraBedOnRequest: string;
  _provider_rate_key: string;
  _special_promotions: ReservationResponseOrderRoomProviderOfferRateBasisSpecialPromotion[];
  allowsSpecialRequests: string;
  allowsBeddingPreference: string;
  _promotion_daily_breakdown: ReservationResponseOrderRoomProviderOfferRateBasisPromotionDailyBreakdownItem[];
  withinCancellationDeadline: string;
  passengerNamesRequiredForBooking: string;
}

export interface ReservationResponseOrderRoomProviderOffer {
  hotel: ReservationResponseOrderRoomProviderOfferHotel;
  rate_basis: ReservationResponseOrderRoomProviderOfferRateBasis;
}

export interface ReservationResponseOrderRoomSpecialPromotion {
  name: string;
  stay: string;
  type: string;
  runno: string;
  discount: string;
  promotionDisplayName: string;
}

export interface ReservationResponseOrderRoomWedbedsBookingPayloadRoom {
  children: unknown[];
  rateBasis: number;
  adultsCode: number;
  passengerNationality: string;
  passengerCountryOfResidence: string;
}

export interface ReservationResponseOrderRoomWedbedsBookingPayload {
  rooms: ReservationResponseOrderRoomWedbedsBookingPayloadRoom[];
  toDate: string;
  currency: string;
  fromDate: string;
  hotelCode: string;
  productId: string;
}

export interface ReservationResponseOrderRoomPromotionDailyBreakdownItem {
  price: string;
  runno: string;
  discount: string;
  freeStay: string;
}

export interface ReservationResponseOrderRoom {
  room: ReservationResponseOrderRoomRoom;
  price: ReservationResponseOrderRoomPrice;
  taxes: ReservationResponseOrderRoomTaxes;
  guests: ReservationResponseOrderRoomGuests;
  pricing: ReservationResponseOrderRoomPricing;
  refunds: ReservationResponseOrderRoomRefunds;
  offer_id: string;
  policies: ReservationResponseOrderRoomPolicies;
  provider: string;
  occupancy: ReservationResponseOrderRoomOccupancy;
  rate_code: string;
  board_type: string;
  commission?: null;
  rate_basis: string;
  check_in_date: string;
  wedbeds_block: ReservationResponseOrderRoomWedbedsBlock;
  check_out_date: string;
  provider_offer: ReservationResponseOrderRoomProviderOffer;
  promotion_labels: string[];
  promotion_summary: string;
  special_promotions: ReservationResponseOrderRoomSpecialPromotion[];
  wedbeds_booking_payload: ReservationResponseOrderRoomWedbedsBookingPayload;
  promotion_daily_breakdown: ReservationResponseOrderRoomPromotionDailyBreakdownItem[];
}

export interface ReservationResponseOrderCancellationPolicy {
  type: string;
  refundable: boolean;
  cancellation_allowed: boolean;
  cancel_restricted: boolean;
  description: string;
  refundable_until: string;
  refundable_until_iso: string;
  charge_after_deadline: string;
  amount: number;
  currency: string;
}

export interface ReservationResponseOrderTariffNotes {
  messages: string[];
  rate_type_notes: unknown[];
  remarks?: null;
}

export interface ReservationResponseOrder {
  status: string;
  reservation_id: string;
  provider: string;
  booking_details: ReservationResponseOrderBookingDetails;
  booked_by: ReservationResponseOrderBookedBy;
  hotel: ReservationResponseOrderHotel;
  payment_details: ReservationResponseOrderPaymentDetails;
  rewards: ReservationResponseOrderRewards;
  room: ReservationResponseOrderRoom;
  cancellation_policy: ReservationResponseOrderCancellationPolicy;
  tariff_notes: ReservationResponseOrderTariffNotes;
  pnr: string;
}

export interface ReservationResponseBookedBy {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  auth_provider: string;
  is_onboarding_complete: number;
  pending_email?: null;
  is_email_update_pending: boolean;
}

export interface ReservationResponse {
  uuid: string;
  params: ReservationResponseParams;
  room: ReservationResponseRoom;
  is_cancelled: boolean;
  provider_response: ReservationResponseProviderResponse;
  expires_at: string;
  expires_in_seconds: number;
  created_at: string;
  order: ReservationResponseOrder;
  provider: string;
  pnr: string;
  booked_by: ReservationResponseBookedBy;
  payment_status: string;
  booking_status: string;
  ama_cancellation_number?: null;
}

export interface ReservationsResponse {
  data: ReservationResponse[];
}

export interface ReservationDetailsResponse {
  data: ReservationResponse;
}
