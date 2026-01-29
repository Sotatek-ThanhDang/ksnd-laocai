type ExtractParams<S extends string> =
  S extends `${string}{${infer P}}${infer R}` ? P | ExtractParams<R> : never;

type ParamDict<S extends string> = Record<
  ExtractParams<S>,
  string | number | boolean
>;

export function fillEndpoint<S extends string>(
  tpl: S,
  params: ParamDict<S>
): string {
  return tpl.replace(/{(\w+)}/g, (_, k: ExtractParams<S>) => {
    const v = params[k];
    if (v === undefined) throw new Error(`Missing URL param: ${String(k)}`);
    return encodeURIComponent(String(v));
  });
}
