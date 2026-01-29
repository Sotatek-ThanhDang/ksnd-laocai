import styled from '@emotion/styled';
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  InputAdornment,
  ListItemText,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
  type TypographyProps,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';
import {
  Fragment,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDebounce, useMeasure } from 'react-use';

import { AllValue } from '../../common/options';
import useOutsideClick from '../../hooks/useOutsideClick';
import { type Option } from '../../types/common';
import { mergeRefs } from '../../utils/mergeRefs';
import { SearchIcon } from './icons';
import { RequiredIcon } from './icons/RequiredIcon';

type FormSelectProps<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
  TMultiple extends boolean | undefined = undefined,
> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  multiple?: TMultiple;
  options: Option<TOptionValue>[];
  renderOption?: (option: Option<TOptionValue>) => ReactNode;
  onChange?: TMultiple extends true
    ? (value: TOptionValue[]) => void
    : (value: TOptionValue) => void;
  allOptions?: TMultiple extends true ? boolean : never;
  withSearch?: TextFieldProps;
  placeholder?: string | ReactNode;
} & Omit<
  SelectProps,
  'name' | 'onBlur' | 'onChange' | 'value' | 'label' | 'multiple'
>;

export function FormSelect<
  TFieldValues extends FieldValues,
  TOptionValue extends string | number,
  TMultiple extends boolean | undefined = undefined,
>({
  control,
  name,
  label,
  options,
  renderOption,
  onChange,
  required,
  withSearch,
  placeholder,
  ...selectProps
}: FormSelectProps<TFieldValues, TOptionValue, TMultiple>) {
  const { t } = useTranslation();
  const labelId = `select_${name}_label`;
  const selectId = `select_${name}`;
  const [search, setSearch] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLElement | null>(null);

  useOutsideClick(inputRef, () => {
    setIsFocus(false);
  });

  const selectedValueRenderer = useMemo(() => {
    const placeholderProps: TypographyProps = {
      variant: 'body_lg',
      color: 'text.senary',
    };
    if (!selectProps.multiple) {
      return function renderSelected(selected: unknown) {
        const selectedLabel = options?.find(
          (otp) => otp.value === selected
        )?.label;

        return selectedLabel ? (
          <Fragment key={selectedLabel}>{selectedLabel}</Fragment>
        ) : (
          <Typography {...placeholderProps}>{placeholder}</Typography>
        );
      };
    }

    return function renderMutilSelected(selected: unknown) {
      if ((selected as TOptionValue[]).length === 0 || selected == null) {
        return <Typography {...placeholderProps}>{placeholder}</Typography>;
      }

      const optionsMap = new Map(options.map((otp) => [otp.value, otp.label]));

      const selectedOptions = (selected as TOptionValue[])
        .map((value) => optionsMap.get(value))
        .filter((label) => label !== undefined);

      return <MultipleSelectValue selected={selectedOptions} />;
    };
  }, [selectProps.multiple, options, placeholder]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          {label && (
            <InputLabel id={labelId} sx={{ width: '100%', textAlign: 'left' }}>
              {label}
              {required && <RequiredIcon />}
            </InputLabel>
          )}

          <Select
            {...selectProps}
            {...field}
            value={field.value ?? null}
            labelId={labelId}
            id={selectId}
            displayEmpty={!!placeholder}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(
                e.target.value as unknown as TOptionValue & TOptionValue[]
              );
            }}
            renderValue={selectedValueRenderer}
            error={!!fieldState.error}
          >
            {withSearch && (
              <TextField
                {...withSearch}
                fullWidth
                value={search}
                onMouseDown={() => {
                  setIsFocus(true);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                onBlur={(e) => {
                  if (isFocus) {
                    // stop focus to the menu option on entering input
                    inputRef.current?.focus();
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                inputRef={inputRef}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ height: '1rem', width: '1rem' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ boxSizing: 'border-box', my: 2, px: 3 }}
              />
            )}

            {selectProps.multiple && selectProps.allOptions && (
              <MenuItem key={'all'} value={AllValue.value}>
                <FormControlLabel
                  label={t(AllValue.label, 'All')}
                  sx={{ width: '100%', ml: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  control={
                    <Checkbox
                      checked={field.value?.length === options.length}
                      indeterminate={
                        field.value?.length > 0 &&
                        field.value?.length < options.length
                      }
                      onChange={(e) => {
                        const selected = e.target.checked
                          ? options.map((item) => item.value)
                          : [];
                        field.onChange(selected);
                        onChange?.(
                          selected as unknown as TOptionValue & TOptionValue[]
                        );
                      }}
                    />
                  }
                />
              </MenuItem>
            )}

            {options
              .filter((option) =>
                option.label
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((option) => {
                const menuItemProps = {
                  key: option.value,
                  value: option.value,
                };

                if (renderOption) {
                  return renderOption(option);
                }

                if (selectProps.multiple) {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <MenuItem {...menuItemProps}>
                      <Checkbox checked={field.value?.includes(option.value)} />
                      <ListItemText primary={option.label} />
                    </MenuItem>
                  );
                }

                // eslint-disable-next-line react/jsx-key
                return <MenuItem {...menuItemProps}>{option.label}</MenuItem>;
              })}
          </Select>
          <FormHelperText error={!!fieldState}>
            {t(fieldState.error?.message ?? '')}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

const HiddenBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
`;

const MultipleSelectValue = <TOptionValue extends string | number>({
  selected: selectedValues,
}: {
  selected: TOptionValue[];
}) => {
  const [visibleValues, setVisibleValues] = useState(selectedValues);
  const [debouncedContainerWidth, setDebouncedContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const placeholderRef = useRef<HTMLSpanElement | null>(null);

  const hiddenCount = selectedValues.length - visibleValues.length;

  const [resizeRef, { width }] = useMeasure();

  const containerRefs = mergeRefs(containerRef, resizeRef);

  useDebounce(
    () => {
      setDebouncedContainerWidth(width);
    },
    500,
    [width]
  );

  useLayoutEffect(() => {
    if (selectedValues.length === 0 || !debouncedContainerWidth) {
      setVisibleValues(selectedValues);
      return;
    }

    const placeholderWidth = placeholderRef.current?.offsetWidth ?? 0;

    let currentWidth = 0;
    let visibleIndex;

    for (let i = 0; i < selectedValues.length; i++) {
      const chipElement = chipRefs.current[i];
      const chipWidth = chipElement?.offsetWidth ?? 0;

      const widthIncludingCurrentChip = currentWidth + chipWidth;
      const widthIncludingPlaceholder =
        widthIncludingCurrentChip + placeholderWidth;

      if (widthIncludingPlaceholder < debouncedContainerWidth) {
        currentWidth = widthIncludingCurrentChip;
      } else if (visibleIndex == null) {
        visibleIndex = i;
        break;
      }
    }

    setVisibleValues(selectedValues.slice(0, visibleIndex));
  }, [selectedValues, debouncedContainerWidth]);

  const placeholderChip = useMemo(() => {
    return (
      <Chip
        ref={placeholderRef}
        key={`Chip_hidden_placeholder_${selectedValues.length}`}
        component="span"
        color="secondary"
        variant="outlined"
        label={`+ ${selectedValues.length}`}
      />
    );
  }, [selectedValues.length]);

  const renderVisualBox = useCallback(() => {
    return (
      <HiddenBox>
        {selectedValues.map((value, idx) => (
          <Chip
            component="span"
            ref={(el) => {
              chipRefs.current[idx] = el;
            }}
            key={`Chip_measurement_${value}`}
            color="secondary"
            variant="outlined"
            label={value}
          />
        ))}
        {placeholderChip}
      </HiddenBox>
    );
  }, [selectedValues, placeholderChip]);

  return (
    <Stack
      position="relative"
      width="100%"
      direction="row"
      gap={0.5}
      ref={containerRefs}
      overflow="hidden"
      component="div"
      title={selectedValues.toString()}
    >
      {/* Render visual box for calculate purpose */}
      {renderVisualBox()}

      {visibleValues.map((value) => (
        <Chip
          component="span"
          key={`Chip_visible_${value}`}
          color="secondary"
          variant="outlined"
          label={value}
        />
      ))}

      {hiddenCount > 0 && (
        <Chip
          component="span"
          color="secondary"
          variant="outlined"
          label={`+ ${hiddenCount}`}
        />
      )}
    </Stack>
  );
};
