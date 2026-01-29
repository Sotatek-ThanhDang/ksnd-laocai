import { Stack, Typography } from '@mui/material';
import { InfoRow, Modal } from '@repo/common';
import type { ModalProps } from '@repo/common/src/types/modal';
import { type FieldValues, type Path, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type BaseModalProps = Omit<ModalProps, 'content'> & { open: boolean };
type ConfirmModalProps<TFieldValues extends FieldValues> = {
  fields: {
    label: string;
    name?: Path<TFieldValues>;
    value?: unknown;
    formatter?: (
      data: FieldValues[keyof FieldValues],
      rawData: TFieldValues
    ) => string;
  }[];
  description?: string;
} & BaseModalProps;

//
//
//

export function ConfirmModal<TFieldValues extends FieldValues>({
  fields,
  description,
  ...modalProps
}: ConfirmModalProps<TFieldValues>) {
  const { getValues } = useFormContext() ?? {
    getValues: (value: unknown) => value,
  };
  const { t } = useTranslation();

  const resolveValue = (
    field: ConfirmModalProps<TFieldValues>['fields'][number]
  ) => {
    if (field.value !== undefined) return field.value;

    if (field.name) return getValues(field.name);

    return '';
  };

  return (
    <Modal
      {...modalProps}
      content={
        <Stack gap={2.5}>
          <Typography
            color="text.quaternary"
            textAlign="center"
            sx={{ textWrap: 'balance' }}
          >
            {description}
          </Typography>

          <Stack
            gap={1}
            paddingInline={2}
            paddingBlock={1.5}
            borderRadius={1.5}
            sx={{ background: (theme) => theme.palette.background.secondary }}
          >
            {fields.map((field) => {
              const rawValue = resolveValue(field);
              const rawData = getValues();

              const displayValue = field.formatter
                ? field.formatter(rawValue, rawData as TFieldValues)
                : rawValue;

              return (
                <InfoRow
                  key={field.name}
                  label={t(field.label)}
                  value={String(displayValue)}
                />
              );
            })}
          </Stack>
        </Stack>
      }
    />
  );
}
