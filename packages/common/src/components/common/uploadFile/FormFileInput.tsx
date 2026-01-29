import { FormControl, FormHelperText } from '@mui/material';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { FileInput, type FileInputProps } from './FileInput';

type FormFileInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
} & Omit<FileInputProps, 'value'>;

export function FormFileInput<TFieldValues extends FieldValues>({
  name,
  control,
  onChange,
  ...fileInputProps
}: FormFileInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <FileInput
            {...fileInputProps}
            value={field.value as unknown as File[]}
            onChange={(file) => {
              onChange?.(file);
              field.onChange(file);
            }}
          />
          <FormHelperText error={!!fieldState.error}>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
