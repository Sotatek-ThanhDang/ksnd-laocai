import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { theme } from '../../libs/mui/theme';
import {
  type LoginFormValues,
  loginSchema,
  loginWithCheckDomainSchema,
} from '../../schema/login';
import { FormInput, FormPassword } from '../common';
import { AlertMessage } from '../common/AlertMessage';
import { CustomRecaptcha } from './CapchaInput';

export type LoginFormProps = {
  onSubmit: (
    values: LoginFormValues,
    formMethods: UseFormReturn<LoginFormValues>
  ) => void;
  defaultValues?: Partial<LoginFormValues>;
  errorMessage?: string | null;
  loading?: boolean;
  links?: {
    forgotPasswordHref?: string;
  };
  showCaptchaBox?: boolean;
  isAdmin: boolean;
  recaptchaSiteKey: string;
  captchaErrorMsg?: string;
  resetCaptchaHandler?: () => void;
  isWithdrawalRedirect?: boolean;
};

export function LoginForm(props: LoginFormProps) {
  const {
    onSubmit,
    defaultValues,
    errorMessage,
    loading = false,
    links,
    showCaptchaBox = false,
    isAdmin,
    recaptchaSiteKey,
    captchaErrorMsg,
    isWithdrawalRedirect = false,
  } = props;
  const { t } = useTranslation();
  const forms = useForm<LoginFormValues>({
    resolver: zodResolver(isAdmin ? loginSchema : loginWithCheckDomainSchema),
    defaultValues: {
      email: '',
      password: '',
      ...defaultValues,
    },
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const onSubmitHandler =
    (forms: UseFormReturn<LoginFormValues>) => (values: LoginFormValues) => {
      forms.clearErrors('root');

      if (!recaptchaToken && showCaptchaBox) {
        forms.setError('recaptchaToken', {
          message: captchaErrorMsg,
        });
        return;
      }

      // Logic changes: if recaptchaToken is not null, clear login fail count & set showCaptchaBox to false -> alway show captcha box after 3 times login failed
      // if (recaptchaToken) {
      //   resetCaptchaHandler?.();
      // }

      const dataToSend = {
        ...values,
        recaptchaToken: recaptchaToken || undefined,
      };

      console.log('reCAPTCHA Token:', dataToSend.recaptchaToken);

      onSubmit(values, forms);
    };

  // Read error from form state or fallback to prop (for backward compatibility)
  const rootError = forms.formState.errors.root?.message || errorMessage;

  return (
    <form
      onSubmit={forms.handleSubmit(onSubmitHandler(forms))}
      style={{ width: '100%' }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="text.primary"
            mb={4}
            textAlign="center"
          >
            {t('login.title')}
          </Typography>

          <Box display="flex" flexDirection="column" gap={3} mb={3}>
            {rootError && <AlertMessage message={rootError} type="error" />}
            {isWithdrawalRedirect && (
              <AlertMessage
                message={t('withdrawal.withdrawalRedirect')}
                type="info"
              />
            )}
            <FormInput
              size="medium"
              control={forms.control}
              name="email"
              label={t('login.email')}
              placeholder={t('login.labelEmail')}
            />
            <Box display="flex" flexDirection="column" gap={1}>
              <FormPassword
                size="medium"
                control={forms.control}
                name="password"
                label={t('login.password')}
                placeholder={t('login.labelPassword')}
              />
              {links?.forgotPasswordHref && (
                <Typography sx={{ color: 'primary.main' }} variant="body_md">
                  <a
                    href={links.forgotPasswordHref}
                    style={{ textDecoration: 'none' }}
                  >
                    {t('login.forgotPassword')}
                  </a>
                </Typography>
              )}
            </Box>
          </Box>

          {showCaptchaBox && (
            <CustomRecaptcha
              sitekey={recaptchaSiteKey}
              onChange={(token) => {
                setRecaptchaToken(token);
                forms.clearErrors('recaptchaToken');
              }}
              onExpired={() => {
                setRecaptchaToken(null);
              }}
              error={!!forms.formState.errors.recaptchaToken}
              captchaErrorMsg={captchaErrorMsg}
            />
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t('login.login')
            )}
          </Button>
        </Box>
      </Container>
    </form>
  );
}
