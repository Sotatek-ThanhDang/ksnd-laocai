import { Box, FormHelperText, styled, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import React, { type ComponentProps, useCallback } from 'react';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { formatNumber } from '../../utils';

//
//
//

type FormTextAreaProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  helperText?: string;
} & Omit<ComponentProps<'textarea'>, 'value' | 'onChange'>;

//
//
//

export function FormTextArea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  onChange,
  maxLength = 255,
  helperText,
  ...inputProps
}: FormTextAreaProps<TFieldValues>) {
  //
  //
  //
  const { t } = useTranslation();

  const handleChange = useCallback(
    (
      field: ControllerRenderProps<
        TFieldValues,
        Path<TFieldValues> & (string | undefined)
      >,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let currentValue = e.target.value;

      if (maxLength) {
        currentValue = currentValue.slice(0, maxLength);
      }

      field.onChange(currentValue);
      onChange?.(currentValue);
    },
    [onChange, maxLength]
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
          <Box position="relative" title={field.value}>
            {label && <InputLabel>{label}</InputLabel>}
            <TextArea
              {...field}
              {...inputProps}
              onChange={handleChange.bind(null, field)}
              error={!!fieldState.error}
              placeholder={
                inputProps.placeholder ??
                `${t('common.enter')} ${label?.toLowerCase() ?? ''}`
              }
            />

            {!inputProps.disabled && (
              <Typography
                color="text.quaternary"
                variant="body_xs"
                position="absolute"
                bottom={10}
                right={5}
              >{`${formatNumber(field.value?.length)} / ${formatNumber(maxLength)}`}</Typography>
            )}
          </Box>
          <HelperText error={!!fieldState.error}>
            {t(fieldState.error?.message ?? helperText ?? '')}
          </HelperText>
        </FormControl>
      )}
    />
  );
}

const HelperText = styled(FormHelperText)`
  margin-inline: 0;
  color: ${({ theme }) => theme.palette.text.quaternary};
`;

export const TextArea = styled('textarea')<{
  error?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  padding: 12px;
  resize: none;
  min-height: 8.125rem;
  font-family: Inter, sans-serif;
  ${({ theme }) => ({ ...theme.typography.body_lg })}
  color:  ${({ theme }) => theme.palette.text.primary};
  border-radius: 8px;
  border: ${({ theme, error }) =>
    error
      ? `1px solid ${theme.palette.error.main}`
      : `1px solid ${theme.palette.border.secondary}`};
  background: ${({ disabled, theme }) =>
    disabled
      ? theme.palette.background.secondary
      : theme.palette.background.default};
  field-sizing: content;
  ::placeholder {
    color: ${({ theme }) => theme.palette.grey[400]};
  }
`;
