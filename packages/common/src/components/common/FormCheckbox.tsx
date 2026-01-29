import Box, { type BoxProps } from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AllValue } from '../../common/options';
import { type Option } from '../../types/common';

//
//
//

type CheckboxProps = {
  label: string;
  type?: 'checkbox';
  onChange?: (value: boolean) => void;
};

type GroupCheckboxProps<TOptionValue extends string | number> = {
  label?: string;
  type?: 'checkbox-group';
  options: Option<TOptionValue>[];
  onChange?: (value: TOptionValue[]) => void;
  containerProps?: BoxProps;
  allOptions?: boolean;
};

type FormCheckbox<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
} & (CheckboxProps | GroupCheckboxProps<TOptionValue>);

//
//
//

export function FormCheckbox<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
>({
  control,
  name,
  type = 'checkbox',
  label,
  ...restProps
}: FormCheckbox<TFieldValues, TOptionValue>) {
  const { t } = useTranslation();
  const groupProps = restProps as GroupCheckboxProps<TOptionValue>;
  const singleProps = restProps as CheckboxProps;

  const [isSelectingAll, setIsSelectingAll] = useState(false);
  const isCheckboxGroup = type === 'checkbox-group';

  //
  //
  //

  function _renderCheckbox(
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) {
    const { onChange } = singleProps;
    return (
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            disableRipple
            checked={field.value}
            name={label}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e.target.checked);
            }}
          />
        }
        label={label}
        color="text.secondary"
        sx={{ m: 0 }}
      />
    );
  }

  function _renderCheckboxGroup(
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) {
    const { options, onChange, containerProps, allOptions } = groupProps;

    if (
      allOptions &&
      options.length === field.value?.length &&
      !isSelectingAll
    ) {
      setIsSelectingAll(true);
    }

    const handleChange = (value: TOptionValue[]) => {
      field.onChange(value);
      onChange?.(value);
    };

    function handleSelectAll(checked: boolean) {
      setIsSelectingAll(checked);

      const newValues = checked ? options.map((o) => o.value) : [];

      handleChange(newValues);
    }

    function handleOptionChange(optionValue: TOptionValue, checked: boolean) {
      let selectedValue = [...field.value];

      if (checked) {
        selectedValue.push(optionValue);
      } else {
        selectedValue = selectedValue.filter((value) => value !== optionValue);
      }

      setIsSelectingAll(selectedValue.length === options.length);

      handleChange(selectedValue);
    }

    return (
      <FormGroup sx={{ width: '100%' }}>
        <Box
          {...containerProps}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            ...containerProps?.sx,
          }}
        >
          {allOptions && (
            <FormControlLabel
              key={'all_option'}
              control={
                <Checkbox
                  {...field}
                  disableRipple
                  checked={isSelectingAll}
                  name={AllValue.label}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              }
              label={t(AllValue.label, 'All')}
              color="text.secondary"
            />
          )}
          {options.map((option) => {
            const checked = field.value?.includes(option.value);

            return (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    {...field}
                    disabled={option.disabled}
                    disableRipple
                    checked={checked}
                    name={option.label}
                    onChange={(e) =>
                      handleOptionChange(option.value, e.target.checked)
                    }
                  />
                }
                label={option.label}
                color="text.secondary"
              />
            );
          })}
        </Box>
      </FormGroup>
    );
  }

  //
  //
  //

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormControl component="fieldset" fullWidth>
            {isCheckboxGroup && label && (
              <FormLabel component="legend">{label}</FormLabel>
            )}

            {isCheckboxGroup
              ? _renderCheckboxGroup(field)
              : _renderCheckbox(field)}

            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
