export const isNotNumber = (argument: unknown): boolean =>
  !Number.isFinite(Number(argument));

export const isNegativeNumber = (argument: number): boolean => argument < 0;

export const isNonPositiveNumber = (argument: number): boolean => argument <= 0;

export const isZero = (argument: number): boolean => argument === 0;
