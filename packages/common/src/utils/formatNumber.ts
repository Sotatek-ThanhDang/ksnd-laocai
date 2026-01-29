import { SUPPORTED_MESSAGE } from '../common';

const formatNumber = (
  num: number | string | null | undefined,
  maximumFractionDigits = 0
) => {
  if (!num) return '0';

  return Number(num).toLocaleString(SUPPORTED_MESSAGE.vi, {
    maximumFractionDigits,
  });
};

const formatNumberWithoutDefaultValue = (
  ...params: Parameters<typeof formatNumber>
) => (!params[0] ? '' : formatNumber(...params));

export { formatNumber, formatNumberWithoutDefaultValue };
