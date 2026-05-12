import * as v from 'valibot';

export const BoxNowEnvironmentSchema = v.picklist(['sandbox', 'production']);
export type BoxNowEnvironment = v.InferOutput<typeof BoxNowEnvironmentSchema>;

export const BoxNowCountryCodeSchema = v.picklist(['GR', 'CY', 'BG', 'HR']);
export type BoxNowCountryCode = v.InferOutput<typeof BoxNowCountryCodeSchema>;

export const CompartmentSizeSchema = v.picklist(['small', 'medium', 'large']);
export type CompartmentSize = v.InferOutput<typeof CompartmentSizeSchema>;

export const CompartmentSizeCodeSchema = v.picklist(['1', '2', '3']);
export type CompartmentSizeCode = v.InferOutput<typeof CompartmentSizeCodeSchema>;

export const BoxNowIdSchema = v.pipe(v.string(), v.minLength(1));
export type BoxNowId = v.InferOutput<typeof BoxNowIdSchema>;

export const BoxNowDisplayNameSchema = v.pipe(v.string(), v.minLength(1));
export type BoxNowDisplayName = v.InferOutput<typeof BoxNowDisplayNameSchema>;

export const BoxNowAddressLineSchema = v.pipe(v.string(), v.minLength(1));
export type BoxNowAddressLine = v.InferOutput<typeof BoxNowAddressLineSchema>;

export const BoxNowPostalCodeSchema = v.pipe(v.string(), v.minLength(1));
export type BoxNowPostalCode = v.InferOutput<typeof BoxNowPostalCodeSchema>;
