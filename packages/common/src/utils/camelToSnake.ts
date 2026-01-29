function camelToSnake(key: string): string {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function fromSnakeToCamel<
  TTarget extends Record<string, unknown>,
  TSource extends Record<string, unknown> = Record<string, unknown>,
>(src: TSource, fields: readonly (keyof TTarget & string)[]): TTarget {
  const result = {} as TTarget;

  fields.forEach((camelKey) => {
    const snakeKey = camelToSnake(camelKey);

    result[camelKey] = src[
      snakeKey as keyof TSource
    ] as unknown as TTarget[typeof camelKey];
  });

  return result;
}
