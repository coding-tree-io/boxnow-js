import { describe, expect, it } from 'vitest';
import { normalizeLockerSelection } from './locker.js';

describe('normalizeLockerSelection', () => {
  it('normalizes valid widget selection into a host-facing LockerSnapshot', () => {
    const result = normalizeLockerSelection({
      boxnowLockerId: 'locker-42',
      boxnowLockerName: 'Athens Central',
      boxnowLockerAddressLine1: 'Pireos 1',
      boxnowLockerPostalCode: '10431',
      boxnowLockerCountry: 'GR',
    });

    expect(result).toEqual({
      value: {
        id: 'locker-42',
        name: 'Athens Central',
        addressLine1: 'Pireos 1',
        postalCode: '10431',
        country: 'GR',
      },
    });
  });

  it('rejects invalid widget payloads with issues', () => {
    const result = normalizeLockerSelection({
      boxnowLockerId: 'locker-42',
      boxnowLockerName: 'Athens Central',
      boxnowLockerPostalCode: '10431',
    });

    expect(result.value).toBeUndefined();
    expect(result.issues?.length).toBeGreaterThan(0);
  });

  it('does not expose raw widget fields in the LockerSnapshot output', () => {
    const result = normalizeLockerSelection({
      boxnowLockerId: 'locker-42',
      boxnowLockerName: 'Athens Central',
      boxnowLockerAddressLine1: 'Pireos 1',
      boxnowLockerPostalCode: '10431',
    });

    expect(result.value).toEqual({
      id: 'locker-42',
      name: 'Athens Central',
      addressLine1: 'Pireos 1',
      postalCode: '10431',
    });
    expect(result.value).not.toHaveProperty('boxnowLockerId');
  });

  it('does not depend on hidden browser storage or sessions', () => {
    const implementation = normalizeLockerSelection.toString();

    expect(implementation).not.toContain('localStorage');
    expect(implementation).not.toContain('sessionStorage');
    expect(implementation).not.toContain('session');
  });
});
