async function delay(timeout: number = 500) {
  return new Promise((rel) => setTimeout(rel, timeout));
}

export { delay };
