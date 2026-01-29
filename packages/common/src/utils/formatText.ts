export const normalizeEventType = (type: string) => {
  return type?.replace(/_EXPIRATION$/, '');
};
