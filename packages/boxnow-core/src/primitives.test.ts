import { describe, expect, it } from 'vitest';
import {
  BoxNowCountryCodeSchema,
  BoxNowEnvironmentSchema,
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

  it('rejects unknown primitive values with issues', async () => {
    const result = await validateWithSchema(BoxNowCountryCodeSchema, 'US');

    expect(result.value).toBeUndefined();
    expect(result.issues?.length).toBeGreaterThan(0);
  });
});
