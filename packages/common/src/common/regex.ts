const REGEX = {
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/,
} as const;

export { REGEX };
