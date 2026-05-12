import { describe, expect, it } from 'vitest';
import {
  validateAuthSessionResponse,
  validateDeliveryRequest,
  validateParcelLabelOptions,
} from './index.js';

describe('@coding-tree-io/boxnow package surface', () => {
  it('exports server protocol validators', () => {
    expect(validateAuthSessionResponse({ access_token: 'token', expires_in: 3600 })).toEqual({
      value: { access_token: 'token', expires_in: 3600 },
    });
    expect(validateParcelLabelOptions({ format: 'pdf' })).toEqual({
      value: { format: 'pdf' },
    });
  });

  it('exports delivery request validation from the public server package', () => {
    expect(
      validateDeliveryRequest({
        orderNumber: 'BLACKBOX-1001',
        invoiceValue: 39.9,
        paymentMode: 'prepaid',
        origin: {
          contactNumber: '+302100000000',
          contactName: 'BlackBox Records',
          locationId: '2',
        },
        destination: {
          contactNumber: '+306900000000',
          contactName: 'Ada Lovelace',
          locationId: 'locker-123',
        },
        items: [{ value: 39.9, weight: 0.6, compartmentSize: '1' }],
      }),
    ).toMatchObject({
      value: {
        orderNumber: 'BLACKBOX-1001',
        items: [{ compartmentSize: '1' }],
      },
    });
  });
});
