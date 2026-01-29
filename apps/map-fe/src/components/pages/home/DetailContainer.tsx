import { Box, Paper, Stack, Typography } from '@mui/material';
import { formatNumber } from '@repo/common';
import { type ComponentProps, useMemo } from 'react';

import { useHomeStateContext } from '@/context/HomeContextProvider';

export function DetailContainer() {
  const { selectedWard } = useHomeStateContext();

  const detailInfoProps = useMemo(() => {
    const baseData = { area: 6383.88, population: 730, density: 114 };
    const baseFields = [
      {
        label: 'Diện tích',
        name: 'area',
        formatter: (value: number) => `${formatNumber(value, 2)}km²`,
      },
      {
        label: 'Dân số',
        name: 'population',
        formatter: (value: number) => `${formatNumber(value)} người`,
      },
      {
        label: 'Mật độ dân số',
        name: 'density',
        formatter: (value: number) => `${formatNumber(value)} người/km²`,
      },
    ] as unknown as ComponentProps<
      typeof DetailInfo<typeof baseData>
    >['fields'];

    if (!selectedWard) {
      return {
        title: 'Tỉnh Lào Cai',
        data: baseData,
        fields: [
          ...baseFields,
          {
            label: 'Thủ phủ',
            value: 'Thành phố Lào Cai',
          },
        ],
      };
    }

    return {
      title: selectedWard.name,
      data: {
        area: Math.random() * 1000,
        population: Math.random() * 1000,
        density: Math.random() * 100,
      },
      fields: baseFields,
    };
  }, [selectedWard]);

  return <DetailInfo {...detailInfoProps} />;
}

type DetailInfoProps<TData extends object> = {
  title: string;
  data?: TData;
  fields: {
    label: string;
    name?: keyof TData;
    value?: unknown;
    formatter?: (data: TData[keyof TData], rawData?: TData) => string;
  }[];
};
function DetailInfo<TData extends object>({
  title,
  data,
  fields,
}: DetailInfoProps<TData>) {
  const resolveValue = (
    data: TData,
    field: DetailInfoProps<TData>['fields'][number]
  ) => {
    if (field.value !== undefined) return field.value;

    if (field.name && data) return data[field.name as keyof TData];
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: 16,
        left: 80,
        zIndex: 1000,
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          {title}
        </Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {fields.map((item) => {
            const value = resolveValue(data as TData, item);
            return (
              <Box key={item.label}>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {item.formatter
                    ? item.formatter(value as TData[keyof TData], data as TData)
                    : String(value)}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}
