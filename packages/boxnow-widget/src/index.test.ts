import { describe, expect, it } from 'vitest';
import * as widget from './index.js';

describe('@coding-tree-io/boxnow-widget package surface', () => {
  it('exports locker selection normalization', () => {
    expect(
      widget.normalizeLockerSelection({
        boxnowLockerId: 'locker-123',
        boxnowLockerName: 'Syntagma Locker',
        boxnowLockerAddressLine1: '1 Ermou',
        boxnowLockerPostalCode: '10563',
        boxnowLockerCountry: 'GR',
      }),
    ).toEqual({
      value: {
        id: 'locker-123',
        name: 'Syntagma Locker',
        addressLine1: '1 Ermou',
        postalCode: '10563',
        country: 'GR',
      },
    });
  });

  it('does not export server credential or auth session contracts', () => {
    expect('AuthSessionResponseSchema' in widget).toBe(false);
    expect('validateAuthSessionResponse' in widget).toBe(false);
    expect('clientSecret' in widget).toBe(false);
  });
});
