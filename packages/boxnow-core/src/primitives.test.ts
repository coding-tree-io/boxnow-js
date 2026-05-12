import { describe, expect, it } from 'vitest';
import {
  BoxNowCountryCodeSchema,
  BoxNowEnvironmentSchema,
  COMPARTMENT_SIZE_CODE_BY_SIZE,
  COMPARTMENT_SIZE_DIMENSIONS_CM,
  CompartmentSizeSchema,
} from './primitives.js';
import { validateWithSchema } from './validation.js';

describe('primitive schemas', () => {
  it('accepts known environments', async () => {
    await expect(await validateWithSchema(BoxNowEnvironmentSchema, 'sandbox')).toEqual({
      value: 'sandbox',
    });
    await expect(await validateWithSchema(BoxNowEnvironmentSchema, 'production')).toEqual({
      value: 'production',
    });
  });

  it('accepts known country codes', async () => {
    await expect(await validateWithSchema(BoxNowCountryCodeSchema, 'GR')).toEqual({
      value: 'GR',
    });
    await expect(await validateWithSchema(BoxNowCountryCodeSchema, 'CY')).toEqual({
      value: 'CY',
    });
  });

  it('accepts merchant compartment sizes', async () => {
    await expect(await validateWithSchema(CompartmentSizeSchema, 'small')).toEqual({
      value: 'small',
    });
    await expect(await validateWithSchema(CompartmentSizeSchema, 'medium')).toEqual({
      value: 'medium',
    });
    await expect(await validateWithSchema(CompartmentSizeSchema, 'large')).toEqual({
      value: 'large',
    });
  });

  it('exposes known compartment codes and dimensions', () => {
    expect(COMPARTMENT_SIZE_CODE_BY_SIZE).toEqual({
      small: '1',
      medium: '2',
      large: '3',
    });
    expect(COMPARTMENT_SIZE_DIMENSIONS_CM).toEqual({
      small: { length: 60, width: 45, height: 8 },
      medium: { length: 60, width: 45, height: 17 },
      large: { length: 60, width: 45, height: 36 },
    });
  });

  it('rejects unknown primitive values with issues', async () => {
    const result = await validateWithSchema(BoxNowCountryCodeSchema, 'US');

    expect(result.value).toBeUndefined();
    expect(result.issues?.length).toBeGreaterThan(0);
  });
});
