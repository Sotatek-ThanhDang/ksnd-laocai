import dayjs, { type ConfigType, Dayjs } from 'dayjs';

import {
  DATE_FORMAT_VI,
  DEFAULT_DATE_TIME_FORMAT,
} from '../common/dateTimeFormat';
import type {
  FormSectionValues,
  InformationKey,
  RowsInformation,
} from '../types';

const formatDateTime = (
  dateTimeValue: ConfigType,
  dateTimeFormat = DEFAULT_DATE_TIME_FORMAT,
  baseFormat?: string
) => {
  if (!dateTimeValue) return '';

  const formattedDate = dayjs(dateTimeValue, baseFormat).format(dateTimeFormat);
  return formattedDate;
};

const dateFormatter =
  (
    dateTimeFormat: Parameters<typeof formatDateTime>[1] = DATE_FORMAT_VI,
    baseFormat?: string
  ) =>
  (dateTimeValue: Parameters<typeof formatDateTime>[0]) =>
    formatDateTime(dateTimeValue, dateTimeFormat, baseFormat);

const toDayjsOrNull = (v: unknown): Dayjs | null => {
  if (typeof v === 'string' && v) {
    const d = dayjs(v);
    return d.isValid() ? d : null;
  }
  if (v && (v as any).isValid?.()) return v as Dayjs;
  return null;
};

function coerceIsoToDayjs<K extends InformationKey>(
  key: K,
  rows: RowsInformation<K>[],
  values: FormSectionValues<K>
): FormSectionValues<K> {
  const cloned = { ...values } as any;
  const sectionObj = { ...(cloned[key] ?? {}) };

  rows.forEach((r) => {
    if (r.input.type !== 'date') return;
    const name = r.input.name as string;
    sectionObj[name] = toDayjsOrNull(sectionObj[name]);
  });

  cloned[key] = sectionObj;
  return cloned as FormSectionValues<K>;
}

export { coerceIsoToDayjs, dateFormatter, formatDateTime };
