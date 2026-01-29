import dayjs from 'dayjs';
import i18next from 'i18next';
import { z } from 'zod';

import {
  DATE_FORMAT_VI,
  DATE_FORMAT_YEAR_FIRST_WITH_HYPHEN,
  REGEX,
  today,
} from '../common';
import { formatDateTime } from './formatDateTime';

const blockedDomains = ['decathlon'];

const requiredValidation = z
  .string()
  .trim()
  .min(1, 'common.form.errorMessage.required');

const numberValidation = z.coerce.number('common.form.errorMessage.required');

const positiveNumberValidation = numberValidation.positive(
  'common.form.errorMessage.positive'
);

const passwordValidation = requiredValidation.regex(
  REGEX.PASSWORD,
  'common.form.errorMessage.password'
);
const emailValidation = requiredValidation.email(
  'common.form.errorMessage.email'
);
const emailValidationWithCheckDomain = emailValidation.superRefine(
  (email, ctx) => {
    const domain = email.split('@')[1]?.toLowerCase();
    const mainDomain = domain?.split('.')[0];

    if (!domain || !mainDomain) return;

    if (blockedDomains.includes(mainDomain)) {
      ctx.addIssue({
        code: 'custom',
        message: i18next.t('common.form.errorMessage.domainIsNotAllowed', {
          domain: `@${domain}`,
        }),
      });
    }
  }
);

const phoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
const phoneValidation = requiredValidation.refine(
  (val) => {
    const cleaned = val.replace(/\D/g, '');
    return phoneRegex.test(cleaned);
  },
  {
    message: 'common.form.errorMessage.phone',
  }
);

/**
 * Convert input (null/empty, dayjs, Date) to date string or null.
 * Used for .preprocess()
 */
const datePreprocess = (v: unknown) => {
  if (v == null) return '';

  if (dayjs.isDayjs(v)) {
    return v.format(DATE_FORMAT_VI);
  }

  if (v instanceof Date) {
    return formatDateTime(v, DATE_FORMAT_VI);
  }

  return v;
};

/**
 * Final conversion function (used for .transform())
 */
const dateTransform = (data: string) => {
  return data
    ? dayjs(data, DATE_FORMAT_VI).format(DATE_FORMAT_YEAR_FIRST_WITH_HYPHEN)
    : '';
};

const baseDateSchema = z.preprocess(datePreprocess, requiredValidation);

const dateValidation = baseDateSchema.transform(dateTransform);

const dateValidationWithPastOnly = baseDateSchema
  .refine((data) => dayjs(data, DATE_FORMAT_VI).isBefore(today), {
    message: 'common.form.errorMessage.dateMustBeInPast',
  })
  .transform(dateTransform);

const dateValidationWithFutureOnly = baseDateSchema
  .refine((data) => dayjs(data, DATE_FORMAT_VI).isAfter(today), {
    message: 'common.form.errorMessage.dateMustBeInFuture',
  })
  .transform(dateTransform);

export {
  dateValidation,
  dateValidationWithFutureOnly,
  dateValidationWithPastOnly,
  emailValidation,
  emailValidationWithCheckDomain,
  numberValidation,
  passwordValidation,
  phoneValidation,
  positiveNumberValidation,
  requiredValidation,
};
