function normalizeOnlyNumberInput(_: string, currentValue: string) {
  return currentValue.replace(/[^0-9]/g, '');
}

function normalizeOnlyNumberAndCharInput(_: string, currentValue: string) {
  return currentValue.replace(/[^a-zA-Z0-9]/g, '');
}

export { normalizeOnlyNumberAndCharInput, normalizeOnlyNumberInput };
