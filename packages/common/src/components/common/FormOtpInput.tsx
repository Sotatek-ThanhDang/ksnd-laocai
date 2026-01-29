import { inputBaseClasses } from '@mui/material/InputBase';
import {
  MuiOtpInput,
  type MuiOtpInputProps,
} from 'mui-one-time-password-input';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type OtpInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
} & MuiOtpInputProps;

export function FormOtpInput<TFieldValues extends FieldValues>({
  control,
  name,
  ...muiInputProps
}: OtpInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MuiOtpInput
          {...field}
          {...muiInputProps}
          validateChar={(character: string) => !/[^\d]/g.test(character)}
          sx={{
            [`.${inputBaseClasses.root}`]: {
              borderRadius: '50%!important',
              aspectRatio: 1,
            },
            ...muiInputProps.sx,
          }}
        />
      )}
    />
  );
}
