import * as v from 'valibot';
import { describe, expect, it } from 'vitest';
import { validateWithSchema } from './validation.js';

describe('validateWithSchema', () => {
  const lockerSchema = v.object({
    id: v.string(),
    name: v.string(),
  });

  it('returns a value for valid input', async () => {
    const result = await validateWithSchema(lockerSchema, {
      id: 'locker-1',
      name: 'Athens Locker',
    });

    expect(result).toEqual({
      value: {
        id: 'locker-1',
        name: 'Athens Locker',
      },
    });
    expect(result.issues).toBeUndefined();
  });

  it('returns issues for invalid input', async () => {
    const result = await validateWithSchema(lockerSchema, {
      id: 'locker-1',
      name: 123,
    });

    expect(result.value).toBeUndefined();
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.any(String),
        }),
      ]),
    );
  });

  it('lets callers branch on issues without catching exceptions', async () => {
    const result = await validateWithSchema(lockerSchema, {});

    if (result.issues) {
      expect(result.issues.length).toBeGreaterThan(0);
      return;
    }

    expect.unreachable('invalid input should return issues');
  });
});
