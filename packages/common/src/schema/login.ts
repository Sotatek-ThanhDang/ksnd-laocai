import {
  emailValidation,
  emailValidationWithCheckDomain,
  requiredValidation,
} from '@repo/common';
import { z } from 'zod';

const createLoginSchema = (useBlockedDomain = true) =>
  z.object({
    email: useBlockedDomain ? emailValidationWithCheckDomain : emailValidation,
    password: requiredValidation,
    recaptchaToken: z.string().optional(),
  });

const loginWithCheckDomainSchema = createLoginSchema(true);
const loginSchema = createLoginSchema(false);

type LoginFormValues = z.infer<typeof loginWithCheckDomainSchema>;

export { type LoginFormValues, loginSchema, loginWithCheckDomainSchema };
