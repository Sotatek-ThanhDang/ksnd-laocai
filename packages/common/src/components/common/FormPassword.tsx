import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import { FormInput } from './FormInput';
import { EyeOffIcon, EyeOnIcon } from './icons';

export function FormPassword<TFieldValues extends FieldValues>(
  props: Omit<React.ComponentProps<typeof FormInput<TFieldValues>>, 'type'>
) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {!showPassword ? (
                  <EyeOffIcon fontSize="small" />
                ) : (
                  <EyeOnIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
