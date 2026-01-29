import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup, { type RadioGroupProps } from '@mui/material/RadioGroup';
import { useMemo } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import type { Option } from '../../types';

//
//
//

export type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: Option<TOptionValue>[];
  onChange?: (option: TOptionValue) => void;
  formControlProps?: Omit<FormControlProps, 'error'>;
  radioGroupProps?: Omit<RadioGroupProps, 'name'>;
};

//
//
//

export function FormRadioGroup<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
>({
  control,
  name,
  label,
  options,
  onChange,
  formControlProps,
  radioGroupProps,
}: FormRadioGroupProps<TFieldValues, TOptionValue>) {
  const radioGroupId = useMemo(() => `radio-group-${name}`, [name]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormControl component="fieldset" {...formControlProps}>
            <FormLabel id={radioGroupId}>{label}</FormLabel>

            <RadioGroup
              {...field}
              aria-labelledby={radioGroupId}
              {...radioGroupProps}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e.target.value as TOptionValue);
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={String(option.value)}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  disabled={option.disabled}
                />
              ))}
            </RadioGroup>

            {!!fieldState.error && (
              <FormHelperText error={!!fieldState.error}>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
