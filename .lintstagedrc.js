module.exports = {
  '*.{js,ts,jsx,tsx}': [
    () => `turbo run lint`,
    (filenames) => `prettier --write ${filenames.join(' ')}`,
    () => `turbo run check-types`,
  ],
  '*.{json,md}': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
