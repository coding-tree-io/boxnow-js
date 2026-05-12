export type {
  Destination,
  Locker,
  LockerSnapshot,
  Origin,
  RawWidgetLockerSelection,
} from './locker.js';
export {
  DestinationSchema,
  LockerSchema,
  LockerSnapshotSchema,
  normalizeLockerSelection,
  OriginSchema,
  RawWidgetLockerSelectionSchema,
} from './locker.js';
export type {
  BoxNowAddressLine,
  BoxNowCountryCode,
  BoxNowDisplayName,
  BoxNowEnvironment,
  BoxNowId,
  BoxNowPostalCode,
  CompartmentSize,
  CompartmentSizeCode,
  CompartmentSizeDimensionsCm,
} from './primitives.js';
export {
  BoxNowAddressLineSchema,
  BoxNowCountryCodeSchema,
  BoxNowDisplayNameSchema,
  BoxNowEnvironmentSchema,
  BoxNowIdSchema,
  BoxNowPostalCodeSchema,
  COMPARTMENT_SIZE_CODE_BY_SIZE,
  COMPARTMENT_SIZE_DIMENSIONS_CM,
  CompartmentSizeCodeSchema,
  CompartmentSizeSchema,
} from './primitives.js';
export type {
  BoxNowStandardSchema,
  BoxNowValidationIssue,
  BoxNowValidationResult,
} from './validation.js';
export { validateWithSchema } from './validation.js';
