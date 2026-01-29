import Box from '@mui/material/Box';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel, { type InputLabelProps } from '@mui/material/InputLabel';
import {
  DatePicker,
  type DatePickerProps as MuiDatePickerProps,
  pickersInputBaseClasses,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import { Fragment, type ReactNode, useEffect, useRef, useState } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DATE_FORMAT_VI } from '../../common';
import { DatePickerIcon } from './icons';

//
//
//

type DatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  formControlProps?: FormControlProps;
  formLabelProps?: InputLabelProps;
  placeholder?: string;
  showIcon?: boolean;
  invalidDateMessage?: string;
  helperText?: ReactNode;
} & Omit<MuiDatePickerProps, 'value' | 'onChange'>;

export function FormDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  formControlProps,
  formLabelProps,
  showIcon = true,
  invalidDateMessage = 'common.form.errorMessage.date',
  helperText,
  ...datePickerProps
}: DatePickerProps<TFieldValues>) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    debounceOnChange();
  }, []);

  /**
   * Debounced handler used to extract manual text input from DatePicker.
   * MUI DatePicker renders dates as multiple section spans.
   * We read all `.sectionContent` parts and combine them into dd/mm/yyyy.
   */
  const debounceOnChange = debounce(() => {
    const element: HTMLSpanElement[] = Array.from(
      inputRef.current?.querySelectorAll(
        `.${pickersInputBaseClasses.sectionContent}`
      ) ?? []
    );

    setDateInput(element.map((item) => item.innerText).join('/'));
  }, 50);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const DatePickerContainer =
          get(formControlProps, 'sx.flexDirection') === 'row' ? Box : Fragment;

        let errMessage = fieldState.error?.message;

        /**
         * Additional manual validation:
         * If the field has an error AND the value is null - input/date value is null when invalid date input
         * AND the manually typed input is not a valid date, show custom message. (MUI date field
         * doesn't expose the input value so we have to custom valid by oursefl)
         */
        if (
          !!fieldState.error &&
          (field.value == null ||
            !dayjs(field.value, undefined, true).isValid()) &&
          !dayjs(dateInput, DATE_FORMAT_VI, true).isValid() &&
          dateInput !== DATE_FORMAT_VI
        ) {
          errMessage = t(invalidDateMessage, 'The date is invalid date', {
            fieldName: label,
          });
        }

        return (
          <FormControl fullWidth {...formControlProps}>
            {label && <InputLabel {...formLabelProps}>{label}</InputLabel>}
            <DatePickerContainer>
              <DatePicker
                {...field}
                {...datePickerProps}
                slotProps={{
                  textField: {
                    ref: inputRef,
                    size: 'small',
                    error: !!fieldState.error,
                    placeholder,
                    onInput: debounceOnChange,
                  },
                }}
                slots={{
                  openPickerIcon: showIcon ? DatePickerIcon : () => null,
                }}
              />
              <FormHelperText error={!!fieldState.error}>
                {fieldState.error
                  ? t(errMessage ?? '', {
                      fieldName: label,
                    })
                  : helperText}
              </FormHelperText>
            </DatePickerContainer>
          </FormControl>
        );
      }}
    />
  );
}
