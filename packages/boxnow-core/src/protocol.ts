import * as v from 'valibot';
import {
  BoxNowCountryCodeSchema,
  BoxNowDisplayNameSchema,
  BoxNowIdSchema,
  CompartmentSizeCodeSchema,
} from './primitives.js';
import type { BoxNowValidationResult } from './validation.js';
import { validateWithSchema } from './validation.js';

const NonNegativeNumberSchema = v.pipe(v.number(), v.minValue(0));
const PositiveNumberSchema = v.pipe(v.number(), v.minValue(0));
const NonEmptyStringSchema = v.pipe(v.string(), v.minLength(1));

export const AuthSessionResponseSchema = v.object({
  access_token: NonEmptyStringSchema,
  expires_in: NonNegativeNumberSchema,
  token_type: v.optional(NonEmptyStringSchema),
});
export type AuthSessionResponse = v.InferOutput<typeof AuthSessionResponseSchema>;

export const ProtocolLocationSchema = v.object({
  id: BoxNowIdSchema,
  name: BoxNowDisplayNameSchema,
  addressLine1: v.optional(NonEmptyStringSchema),
  postalCode: v.optional(NonEmptyStringSchema),
  country: v.optional(BoxNowCountryCodeSchema),
});
export type ProtocolLocation = v.InferOutput<typeof ProtocolLocationSchema>;

export const OriginResponseSchema = ProtocolLocationSchema;
export type OriginResponse = v.InferOutput<typeof OriginResponseSchema>;

export const DestinationResponseSchema = ProtocolLocationSchema;
export type DestinationResponse = v.InferOutput<typeof DestinationResponseSchema>;

export const DeliveryRequestLocationSchema = v.object({
  contactNumber: NonEmptyStringSchema,
  contactEmail: v.optional(NonEmptyStringSchema),
  contactName: NonEmptyStringSchema,
  locationId: BoxNowIdSchema,
});
export type DeliveryRequestLocation = v.InferOutput<typeof DeliveryRequestLocationSchema>;

export const DeliveryRequestItemSchema = v.object({
  value: NonNegativeNumberSchema,
  weight: PositiveNumberSchema,
  compartmentSize: CompartmentSizeCodeSchema,
});
export type DeliveryRequestItem = v.InferOutput<typeof DeliveryRequestItemSchema>;

export const DeliveryRequestSchema = v.object({
  orderNumber: NonEmptyStringSchema,
  invoiceValue: NonNegativeNumberSchema,
  paymentMode: NonEmptyStringSchema,
  amountToBeCollected: v.optional(NonNegativeNumberSchema),
  notifyOnAccepted: v.optional(v.boolean()),
  origin: DeliveryRequestLocationSchema,
  destination: DeliveryRequestLocationSchema,
  items: v.pipe(v.array(DeliveryRequestItemSchema), v.minLength(1)),
});
export type DeliveryRequest = v.InferOutput<typeof DeliveryRequestSchema>;

export const ParcelLabelFormatSchema = v.picklist(['pdf', 'zpl']);
export type ParcelLabelFormat = v.InferOutput<typeof ParcelLabelFormatSchema>;

export const ParcelLabelOptionsSchema = v.object({
  format: ParcelLabelFormatSchema,
});
export type ParcelLabelOptions = v.InferOutput<typeof ParcelLabelOptionsSchema>;

export const ParcelResponseSchema = v.object({
  id: BoxNowIdSchema,
  orderNumber: v.optional(NonEmptyStringSchema),
  parcelNumber: v.optional(NonEmptyStringSchema),
  state: v.optional(NonEmptyStringSchema),
  compartmentSize: v.optional(CompartmentSizeCodeSchema),
});
export type ParcelResponse = v.InferOutput<typeof ParcelResponseSchema>;

export const DeliveryRequestResponseSchema = v.object({
  id: BoxNowIdSchema,
  orderNumber: v.optional(NonEmptyStringSchema),
  parcels: v.array(ParcelResponseSchema),
});
export type DeliveryRequestResponse = v.InferOutput<typeof DeliveryRequestResponseSchema>;

export function validateAuthSessionResponse(
  value: unknown,
): BoxNowValidationResult<AuthSessionResponse> {
  return validateWithSchema(
    AuthSessionResponseSchema,
    value,
  ) as BoxNowValidationResult<AuthSessionResponse>;
}

export function validateDeliveryRequest(value: unknown): BoxNowValidationResult<DeliveryRequest> {
  return validateWithSchema(
    DeliveryRequestSchema,
    value,
  ) as BoxNowValidationResult<DeliveryRequest>;
}

export function validateParcelLabelOptions(
  value: unknown,
): BoxNowValidationResult<ParcelLabelOptions> {
  return validateWithSchema(
    ParcelLabelOptionsSchema,
    value,
  ) as BoxNowValidationResult<ParcelLabelOptions>;
}

export function validateParcelResponse(value: unknown): BoxNowValidationResult<ParcelResponse> {
  return validateWithSchema(ParcelResponseSchema, value) as BoxNowValidationResult<ParcelResponse>;
}
