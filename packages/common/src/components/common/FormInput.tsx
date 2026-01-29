import { FormHelperText, InputAdornment, styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import React, { type ElementType, forwardRef, useCallback } from 'react';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';

import { theme } from '../../libs';
import { SearchIcon } from './icons';
import { RequiredIcon } from './icons/RequiredIcon';
//
//
//

type Formatter = 'default' | 'number' | 'currency' | 'phone' | 'search';
type CurrentcyType = 'VND' | 'EUR' | 'DOLLAR';

export type FormInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  maxLength?: number | null;
  normalize?: (preValue: string, currentValue: string) => string;
  onChange?: (value: string) => void;
  formatter?: Formatter;
  currencyType?: CurrentcyType;
  decimal?: boolean | number;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'error' | 'label'>;

//
//
//

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  normalize,
  onChange,
  maxLength = 50,
  formatter = 'default',
  currencyType = 'VND',
  helperText,
  required,
  decimal = true,
  ...inputProps
}: FormInputProps<TFieldValues>) {
  const { t } = useTranslation();
  //
  //
  //

  const inputComponent = {
    currency: NumericFormatCustom,
    number: NumericFormatCustom,
    default: undefined,
    phone: PhoneMask,
    search: undefined,
  }[formatter] as unknown as ElementType<InputBaseComponentProps>;

  const handleChange = useCallback(
    (
      field: ControllerRenderProps<
        TFieldValues,
        Path<TFieldValues> & (string | undefined)
      >,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let currentValue = e.target.value;
      const preValue = field.value;

      if (maxLength) {
        currentValue = currentValue.slice(0, maxLength);
      }

      if (normalize) {
        currentValue = normalize(preValue, currentValue);
      }

      field.onChange(currentValue);
      onChange?.(currentValue);
    },
    [onChange, normalize, maxLength]
  );

  //
  //
  //

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          {label && (
            <InputLabel sx={{ width: '100%', textAlign: 'left' }}>
              {label}

              {required && <RequiredIcon />}
            </InputLabel>
          )}
          <TextField
            {...field}
            {...inputProps}
            placeholder={
              inputProps.placeholder ??
              `${t('common.enter')} ${label?.toLowerCase() ?? ''}`
            }
            variant="outlined"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message &&
              t(fieldState.error.message, { fieldName: label })
            }
            onChange={handleChange.bind(null, field)}
            slotProps={{
              input: {
                inputProps: {
                  decimalScale: decimal
                    ? decimal === true
                      ? undefined
                      : decimal
                    : 0,
                },
                inputComponent,
                ...inputProps.slotProps?.input,
                ...(formatter === 'currency' && {
                  endAdornment: (
                    <InputAdornment
                      sx={{
                        maxHeight: '2.5rem',
                        height: '2.5rem',
                        paddingLeft: '12px',
                        borderLeft: `1px solid ${theme.palette.grey[200]}`,
                      }}
                      position="end"
                    >
                      {currencyType}
                    </InputAdornment>
                  ),
                }),
                ...(formatter === 'search' && {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ height: '1rem', width: '1rem' }} />
                    </InputAdornment>
                  ),
                }),
              },
            }}
          />
          {!fieldState.error && <HelperText>{helperText}</HelperText>}
        </FormControl>
      )}
    />
  );
}

const HelperText = styled(FormHelperText)`
  margin-inline: 0;
  color: ${({ theme }) => theme.palette.text.quaternary};
`;

// ----------------------------------------------------------------------
// Component Custom Numeric Format
// ----------------------------------------------------------------------

type NumericFormatCustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const NumericFormatCustom = forwardRef<
  HTMLInputElement,
  NumericFormatCustomProps
>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      allowNegative={false}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=","
      valueIsNumericString
    />
  );
});

NumericFormatCustom.displayName = 'NumericFormatCustom';

type PhoneMaskProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const PhoneMask = forwardRef<HTMLInputElement, PhoneMaskProps>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="000-000-0000"
      unmask={true}
      lazy={false}
      placeholderChar="_"
      inputRef={ref}
      onAccept={(value: string) => {
        onChange({
          target: {
            name: props.name,
            value,
          },
        });
      }}
    />
  );
});

PhoneMask.displayName = 'PhoneMask';
