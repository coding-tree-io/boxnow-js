import { describe, expect, it } from 'vitest';
import {
  ParcelLabelFormatSchema,
  ParcelResponseSchema,
  validateAuthSessionResponse,
  validateDeliveryRequest,
  validateParcelLabelOptions,
  validateParcelResponse,
} from './protocol.js';
import { validateWithSchema } from './validation.js';

const validDeliveryRequest = {
  orderNumber: 'BLACKBOX-1001',
  invoiceValue: 39.9,
  paymentMode: 'prepaid',
  notifyOnAccepted: true,
  origin: {
    contactNumber: '+302100000000',
    contactEmail: 'fulfillment@example.test',
    contactName: 'BlackBox Records',
    locationId: '2',
  },
  destination: {
    contactNumber: '+306900000000',
    contactName: 'Ada Lovelace',
    locationId: 'locker-123',
  },
  items: [
    {
      value: 39.9,
      weight: 0.6,
      compartmentSize: '1',
    },
  ],
};

describe('protocol schemas', () => {
  it('validates auth session responses with protocol field names', () => {
    expect(
      validateAuthSessionResponse({
        access_token: 'token-123',
        expires_in: 3600,
        token_type: 'Bearer',
      }),
    ).toEqual({
      value: {
        access_token: 'token-123',
        expires_in: 3600,
        token_type: 'Bearer',
      },
    });
  });

  it('returns issues for invalid auth session responses without throwing', () => {
    const result = validateAuthSessionResponse({ expires_in: 3600 });

    expect(result.value).toBeUndefined();
    expect(result.issues?.length).toBeGreaterThan(0);
  });

  it('validates delivery requests with parcel items', () => {
    expect(validateDeliveryRequest(validDeliveryRequest)).toEqual({
      value: validDeliveryRequest,
    });
  });

  it('rejects delivery requests without parcel items', () => {
    const result = validateDeliveryRequest({
      ...validDeliveryRequest,
      items: [],
    });

    expect(result.value).toBeUndefined();
    expect(result.issues?.length).toBeGreaterThan(0);
  });

  it('validates PDF and ZPL parcel label options', () => {
    expect(validateParcelLabelOptions({ format: 'pdf' })).toEqual({
      value: { format: 'pdf' },
    });
    expect(validateParcelLabelOptions({ format: 'zpl' })).toEqual({
      value: { format: 'zpl' },
    });
  });

  it('keeps parcel label format naming separate from voucher wording', async () => {
    await expect(await validateWithSchema(ParcelLabelFormatSchema, 'voucher')).toMatchObject({
      issues: expect.any(Array),
    });
  });

  it('validates parcel responses without credentials or network access', () => {
    expect(
      validateParcelResponse({
        id: 'parcel-123',
        parcelNumber: 'BN123',
        state: 'new',
        compartmentSize: '2',
      }),
    ).toEqual({
      value: {
        id: 'parcel-123',
        parcelNumber: 'BN123',
        state: 'new',
        compartmentSize: '2',
      },
    });
  });

  it('keeps protocol concepts named around Parcel instead of Voucher', () => {
    expect(ParcelResponseSchema).toBeDefined();
    expect(validateParcelResponse.toString()).not.toContain('Voucher');
  });
});
