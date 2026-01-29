import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CustomRecaptchaProps {
  sitekey: string;
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  label?: string;
  error?: boolean;
  captchaErrorMsg?: string;
}

export function CustomRecaptcha({
  sitekey,
  onChange,
  onExpired,
  label = "I'm not a robot.",
  error,
  captchaErrorMsg,
}: CustomRecaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = async () => {
    if (!isChecked && recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
          backgroundColor: 'background.secondary',
          borderRadius: 2,
          boxShadow: 1,
          border: 1,
          borderColor: error ? 'error.main' : 'border.secondary',
          margin: error ? '0' : '25px 0',
          height: 90,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} flex={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={isChecked}
              icon={
                <CheckBoxOutlineBlankIcon
                  fontSize="small"
                  sx={{
                    color: 'grey.300',
                    borderRadius: 1.5,
                  }}
                />
              }
              checkedIcon={
                <CheckBoxIcon
                  fontSize="small"
                  sx={{
                    color: 'primary.main',
                    borderRadius: 1.5,
                  }}
                />
              }
              sx={{
                padding: 1,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            />
          </Box>
          <Typography
            onClick={handleCheckboxChange}
            sx={{
              fontWeight: 400,
              color: 'text.primary',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            {label}
          </Typography>
        </Stack>

        <Stack direction="column" alignItems="center" spacing={0.5}>
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundImage:
                'url(https://www.gstatic.com/recaptcha/api2/logo_48.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <Typography
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            reCAPTCHA
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              '& a': {
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              },
            }}
          >
            <Typography
              component="a"
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '8px',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline', fontWeight: 800 },
              }}
            >
              Privacy
            </Typography>
            <Typography
              sx={{ fontSize: '8px', color: 'text.secondary', fontWeight: 800 }}
            >
              -
            </Typography>
            <Typography
              component="a"
              fontSize="8px"
              href="https://www.google.com/intl/en/policies/terms/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '8px',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline', fontWeight: 800 },
              }}
            >
              Terms
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            position: 'absolute',
            left: -9999,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={sitekey}
            onExpired={() => {
              setIsChecked(false);
              onExpired?.();
              recaptchaRef.current?.reset();
            }}
            onChange={(token) => {
              setIsChecked(true);
              onChange?.(token);
            }}
            size="invisible"
          />
        </Box>
      </Box>
      {error && (
        <Typography
          sx={{
            color: 'error.main',
            fontSize: '12px',
            marginTop: 1,
            marginBottom: 3,
          }}
        >
          {captchaErrorMsg}
        </Typography>
      )}
    </>
  );
}
