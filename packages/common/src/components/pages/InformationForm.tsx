import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import type {
  ExtractSectionValues,
  FormSectionValues,
  InformationKey,
  RowsInformation,
  SectionKey,
} from '@repo/common';
import {
  coerceIsoToDayjs,
  normalizeOnlyNumberInput,
  SCHEMA_BY_SECTION,
} from '@repo/common';
import {
  type ForwardedRef,
  forwardRef,
  type JSX,
  type RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type { DefaultValues, Path } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { ZodType } from 'zod';
import z from 'zod';
import type { ZodTypeDef } from 'zod/v3';

import { DEFAULT_VALUE } from '../../common/user';
import type { InformationFormValues } from '../../schema';
import {
  FormDatePicker,
  FormInput,
  FormPassword,
  FormSelect,
  Section,
} from '../common';

function buildSectionSchema<K extends InformationKey>(
  key: K
): ZodType<FormSectionValues<K>, ZodTypeDef, any> {
  const base = z.object({
    [key]: SCHEMA_BY_SECTION[key as SectionKey],
  });

  return base;
}

function buildSectionDefault<K extends InformationKey>(
  sectionKey: K,
  defaultSectionValues: Partial<ExtractSectionValues<K>> | undefined,
  DEFAULT_VALUE: InformationFormValues
) {
  const value = (defaultSectionValues ??
    DEFAULT_VALUE[sectionKey] ??
    {}) as ExtractSectionValues<K>;

  const sectionDefault = { [sectionKey]: value } as Pick<
    InformationFormValues,
    K
  >;
  return sectionDefault;
}

export type InformationFormProps<K extends InformationKey> = {
  title: string;
  sectionKey: K;
  rows: RowsInformation<K>[];
  defaultSectionValues?: Partial<FormSectionValues<K>[K]>;
  editable?: boolean;
  formatRow?: 'horizontal' | 'vertical';
  isDisabledChange?: boolean;
  onSubmitSection?: (args: {
    sectionKey: SectionKey;
    data: FormSectionValues<K>[K];
  }) => void;
  onResetForm?: () => void;
  onChangeClick?: () => void;
};

export type InformationFormRef = {
  reset: () => void;
  resetToDefault: () => void;
  setEdited: (edited: boolean) => void;
};

function InformationFormInner<K extends InformationKey>(
  {
    title,
    rows,
    sectionKey,
    defaultSectionValues,
    onSubmitSection,
    onChangeClick,
    formatRow = 'horizontal',
    editable = false,
    isDisabledChange = false,
  }: InformationFormProps<K>,
  ref: ForwardedRef<InformationFormRef>
) {
  const { t } = useTranslation();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const sectionSchema = buildSectionSchema(sectionKey);

  const defaultValues = useMemo(() => {
    const sectionDefaultRaw = buildSectionDefault(
      sectionKey,
      defaultSectionValues as Partial<ExtractSectionValues<K>> | undefined,
      DEFAULT_VALUE
    ) as FormSectionValues<typeof sectionKey>;

    const coerced = coerceIsoToDayjs(sectionKey, rows, sectionDefaultRaw);

    return coerced as unknown as DefaultValues<FormSectionValues<K>>;
  }, [sectionKey, defaultSectionValues, rows]);

  const forms = useForm<FormSectionValues<K>>({
    resolver: zodResolver(sectionSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { handleSubmit } = forms;

  useEffect(() => {
    forms.reset(defaultValues);
  }, [defaultValues, forms]);

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setIsEdited(false);
        forms.reset();
      },
      resetToDefault: () => {
        setIsEdited(false);
        forms.reset(defaultValues);
      },
      setEdited: (edited: boolean) => {
        setIsEdited(edited);
      },
    }),
    [forms, defaultValues]
  );

  const onValid = async (values: FormSectionValues<K>) => {
    const data = values[sectionKey];

    try {
      await onSubmitSection?.({
        sectionKey: sectionKey as SectionKey,
        data,
      });

      setIsEdited(false);
    } catch {
      forms.reset();
      setIsEdited(false);
    }
  };
  const handlerSubmit = handleSubmit(onValid);

  const handleCancel = () => {
    setIsEdited(false);
    forms.reset(defaultValues);
  };

  const isInputDisabled = !editable || !isEdited;

  const renderInput = (row: RowsInformation<K>) => {
    const { type, label, options, showPasswordIcon } = row.input;
    const name = row.input.name;
    const inputName = `${sectionKey}.${name}` as Path<FormSectionValues<K>>;

    switch (type) {
      case 'text':
        return (
          <FormInput
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            maxLength={250}
            placeholder={row.input.placeholder}
          />
        );
      case 'number':
        return (
          <FormInput
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            maxLength={50}
            normalize={normalizeOnlyNumberInput}
            placeholder={row.input.placeholder}
          />
        );
      case 'date':
        return (
          <FormDatePicker
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            showIcon={editable}
            disableFuture
            placeholder={row.input.placeholder}
          />
        );
      case 'email':
        return (
          <FormInput
            type="email"
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            placeholder={row.input.placeholder}
          />
        );
      case 'password':
        return showPasswordIcon ? (
          <FormPassword
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            placeholder={row.input.placeholder}
          />
        ) : (
          <FormInput
            type="password"
            control={forms.control}
            name={inputName}
            label={t(label)}
            disabled={isInputDisabled}
            placeholder={row.input.placeholder}
          />
        );
      case 'phone':
        return (
          <FormInput
            control={forms.control}
            name={inputName}
            label={t(label)}
            formatter="phone"
            disabled={isInputDisabled}
            placeholder={row.input.placeholder}
          />
        );
      case 'select':
        return (
          <FormSelect
            control={forms.control}
            name={inputName}
            label={t(label)}
            options={
              options
                ? options.map((opt) => ({
                    ...opt,
                    label: t(opt.label),
                  }))
                : []
            }
            disabled={isInputDisabled}
            IconComponent={editable ? undefined : () => null}
          />
        );
      default: {
        return null;
      }
    }
  };

  return (
    <Section>
      <form>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="p" variant="body_xl" fontWeight="bold" mb={2}>
            {title}
          </Typography>

          {editable && !isEdited && (
            <Button
              sx={{ alignSelf: 'center' }}
              type="button"
              size="small"
              disabled={isDisabledChange}
              onClick={() =>
                onChangeClick ? onChangeClick() : setIsEdited(true)
              }
            >
              {t('common.change')}
            </Button>
          )}
          {isEdited && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                type="button"
                size="small"
                onClick={handleCancel}
                variant="outlined"
                color="secondary"
              >
                {t('common.cancel')}
              </Button>

              <Button
                type="submit"
                size="small"
                disabled={forms.formState.isSubmitting}
                onClick={handlerSubmit}
              >
                {t('common.save')}
              </Button>
            </Stack>
          )}
        </Stack>
        {formatRow === 'horizontal' ? (
          <Grid container spacing={2}>
            {rows.map((row, index) => (
              <Grid key={index} size={row.size}>
                {renderInput(row)}
                {row.subLabel && (
                  <Typography
                    variant="body_md"
                    fontWeight={400}
                    color="textQuaternary"
                  >
                    {row.subLabel}
                  </Typography>
                )}
                {row.actionRows && <Box>{row.actionRows}</Box>}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack spacing={2}>
            {rows.map((row, index) => (
              <Box key={index} width="100%">
                <Grid container spacing={2}>
                  <Grid size={row.size}>
                    {renderInput(row)}
                    {row.subLabel && (
                      <Typography
                        variant="body_md"
                        fontWeight={400}
                        color="textQuaternary"
                        sx={{ mt: 0.5 }}
                      >
                        {row.subLabel}
                      </Typography>
                    )}
                    {row.actionRows && <Box mt={1}>{row.actionRows}</Box>}
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
        )}
      </form>
    </Section>
  );
}

export const InformationForm = forwardRef(InformationFormInner) as <
  K extends InformationKey,
>(
  props: InformationFormProps<K> & RefAttributes<InformationFormRef>
) => JSX.Element;
