import * as v from 'valibot';
import {
  BoxNowAddressLineSchema,
  BoxNowCountryCodeSchema,
  BoxNowDisplayNameSchema,
  BoxNowIdSchema,
  BoxNowPostalCodeSchema,
} from './primitives.js';
import type { BoxNowValidationResult } from './validation.js';

export const LockerSchema = v.object({
  id: BoxNowIdSchema,
  name: BoxNowDisplayNameSchema,
  addressLine1: BoxNowAddressLineSchema,
  postalCode: BoxNowPostalCodeSchema,
  country: v.optional(BoxNowCountryCodeSchema),
});
export type Locker = v.InferOutput<typeof LockerSchema>;

export const OriginSchema = v.object({
  id: BoxNowIdSchema,
  name: BoxNowDisplayNameSchema,
  addressLine1: v.optional(BoxNowAddressLineSchema),
  postalCode: v.optional(BoxNowPostalCodeSchema),
  country: v.optional(BoxNowCountryCodeSchema),
});
export type Origin = v.InferOutput<typeof OriginSchema>;

export const DestinationSchema = LockerSchema;
export type Destination = v.InferOutput<typeof DestinationSchema>;

export const LockerSnapshotSchema = v.object({
  id: BoxNowIdSchema,
  name: BoxNowDisplayNameSchema,
  addressLine1: BoxNowAddressLineSchema,
  postalCode: BoxNowPostalCodeSchema,
  country: v.optional(BoxNowCountryCodeSchema),
});
export type LockerSnapshot = v.InferOutput<typeof LockerSnapshotSchema>;

export const RawWidgetLockerSelectionSchema = v.object({
  boxnowLockerId: BoxNowIdSchema,
  boxnowLockerName: BoxNowDisplayNameSchema,
  boxnowLockerAddressLine1: BoxNowAddressLineSchema,
  boxnowLockerPostalCode: BoxNowPostalCodeSchema,
  boxnowLockerCountry: v.optional(BoxNowCountryCodeSchema),
});
export type RawWidgetLockerSelection = v.InferOutput<typeof RawWidgetLockerSelectionSchema>;

export function normalizeLockerSelection(value: unknown): BoxNowValidationResult<LockerSnapshot> {
  const result = RawWidgetLockerSelectionSchema['~standard'].validate(value);

  if ('issues' in result && result.issues !== undefined) {
    return { issues: result.issues };
  }

  const lockerSnapshot: LockerSnapshot = {
    id: result.value.boxnowLockerId,
    name: result.value.boxnowLockerName,
    addressLine1: result.value.boxnowLockerAddressLine1,
    postalCode: result.value.boxnowLockerPostalCode,
  };

  if (result.value.boxnowLockerCountry !== undefined) {
    return { value: { ...lockerSnapshot, country: result.value.boxnowLockerCountry } };
  }

  return { value: lockerSnapshot };
}
