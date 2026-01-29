import { Autocomplete, Box, TextField } from '@mui/material';
import type { SyntheticEvent } from 'react';

export type Country = {
  code: string;
  label: string;
  phone: string;
};

const countries: Country[] = [
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'US', label: 'United States', phone: '1' },
  { code: 'JP', label: 'Japan', phone: '81' },
];

type CountrySelectProps = {
  value: Country;
  onChange: (country: Country) => void;
};

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const getFlagUrls = (code?: string) => {
    if (!code) {
      return { src: '', srcSet: '' };
    }

    const lower = code.toLowerCase();
    return {
      src: `https://flagcdn.com/w20/${lower}.png`,
      srcSet: `
        https://flagcdn.com/w40/${lower}.png 2x,
        https://flagcdn.com/w80/${lower}.png 3x
      `,
    };
  };

  const renderFlags = (selectedCountry: Country) => {
    const { src, srcSet } = getFlagUrls(selectedCountry.code);

    return (
      <Box
        display="flex"
        alignItems="center"
        sx={{
          pl: 1,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.border.secondary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            loading="lazy"
            width="24"
            height="24"
            style={{ objectFit: 'cover' }}
            src={src}
            srcSet={srcSet}
            alt={selectedCountry.label}
          />
        </Box>
        <Box sx={{ ml: 0.5 }}>+{selectedCountry.phone}</Box>
      </Box>
    );
  };

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: Country | null
  ) => {
    if (newValue) onChange(newValue);
  };

  return (
    <Autocomplete<Country>
      value={value}
      onChange={handleChange}
      clearIcon={false}
      options={countries}
      getOptionLabel={(option) =>
        option ? `${option.label} (+${option.phone})` : ''
      }
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.code}>
          {renderFlags(option)}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            readOnly: true,
            autoComplete: 'new-password',
          }}
        />
      )}
      renderValue={(selected) => {
        return selected ? renderFlags(selected) : null;
      }}
    />
  );
}
