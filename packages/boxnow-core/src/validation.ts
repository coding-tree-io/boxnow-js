import type { StandardSchemaV1 } from '@standard-schema/spec';

export type BoxNowValidationIssue = StandardSchemaV1.Issue;

export type BoxNowValidationResult<TOutput> =
  | {
      readonly value: TOutput;
      readonly issues?: undefined;
    }
  | {
      readonly issues: ReadonlyArray<BoxNowValidationIssue>;
      readonly value?: undefined;
    };

export type BoxNowStandardSchema<TInput = unknown, TOutput = TInput> = StandardSchemaV1<
  TInput,
  TOutput
>;

export function validateWithSchema<TInput, TOutput>(
  schema: BoxNowStandardSchema<TInput, TOutput>,
  value: unknown,
): BoxNowValidationResult<TOutput> | Promise<BoxNowValidationResult<TOutput>> {
  // valibot and other Standard Schema-compatible validators expose this same contract.
  const result = schema['~standard'].validate(value);

  if (isPromiseLike(result)) {
    return result.then(normalizeStandardResult);
  }

  return normalizeStandardResult(result);
}

function normalizeStandardResult<TOutput>(
  result: StandardSchemaV1.Result<TOutput>,
): BoxNowValidationResult<TOutput> {
  if ('issues' in result && result.issues !== undefined) {
    return { issues: result.issues };
  }

  return { value: result.value };
}

function isPromiseLike<T>(value: T | Promise<T>): value is Promise<T> {
  return typeof (value as Promise<T>).then === 'function';
}
