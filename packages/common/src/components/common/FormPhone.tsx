import {
  type InputBaseComponentProps,
  InputLabel,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { type ChangeEvent, forwardRef, useState } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';

import { type Country, CountrySelect } from './CountrySelect';

interface PhoneMaskProps extends Omit<InputBaseComponentProps, 'onChange'> {
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const PhoneMask = forwardRef<HTMLInputElement, PhoneMaskProps>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-000-0000"
        unmask={true}
        lazy={false}
        placeholderChar="_"
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({
            target: { name: props.name, value },
          })
        }
      />
    );
  }
);

type FormPhoneProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
};

export function FormPhone<TFieldValues extends FieldValues>({
  control,
  label,
  name,
  placeholder,
}: FormPhoneProps<TFieldValues>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormPhoneInner
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message && t(fieldState.error.message)}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}

type FormPhoneInnerProps = {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
};

function FormPhoneInner({
  onChange,
  label,
  placeholder,
  error,
  helperText,
}: FormPhoneInnerProps) {
  const [country, setCountry] = useState<Country>({
    code: 'VN',
    label: 'Vietnam',
    phone: '84',
  });
  const [localNumber, setLocalNumber] = useState<string>('');

  const handleCountryChange = (newCountry: Country) => {
    setCountry(newCountry);
    onChange(localNumber);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value.replace(/\D/g, '');
    setLocalNumber(num);
    onChange(num);
  };

  return (
    <Box width="100%">
      {label && <InputLabel sx={{ mb: 0.5 }}>{label}</InputLabel>}

      <Box display="flex" width="100%">
        <Box
          width="30%"
          sx={{
            [`& .${outlinedInputClasses.root}`]: {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderRight: '0 !important',
              borderTopRightRadius: '0 !important',
              borderBottomRightRadius: '0 !important',
            },
          }}
        >
          <CountrySelect value={country} onChange={handleCountryChange} />
        </Box>

        <Box
          flex={1}
          sx={{
            [`&  .${outlinedInputClasses.root}`]: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderTopLeftRadius: '0 !important',
              borderBottomLeftRadius: '0 !important',
            },
          }}
        >
          <TextField
            fullWidth
            placeholder={placeholder}
            value={localNumber}
            onChange={handlePhoneChange}
            error={error}
            helperText={helperText}
            slotProps={{
              input: {
                inputComponent:
                  PhoneMask as unknown as React.ElementType<InputBaseComponentProps>,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
