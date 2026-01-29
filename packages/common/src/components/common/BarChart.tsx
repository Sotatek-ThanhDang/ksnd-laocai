import { type BarChartProps } from '@mui/x-charts';
import { BarChart as MuiBarChart } from '@mui/x-charts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMeasure } from 'react-use';

import { useThemeBreakpoints } from '../../hooks/useThemeBreakpoints';

const TARGET_BAR_WIDTH = 80; // px when n < 5
const MIN_BAR_WIDTH = 52; // px fallback when space is tight
const COUNT_THRESHOLD = 10; // disable custom sizing above this
const FULL_WIDTH_COUNT = 4; // number of bars that keep full target width before shrinking

type CompactBarChartProps = Pick<BarChartProps, 'series' | 'xAxis'>;

export function BarChart(props: CompactBarChartProps) {
  const [containerRef, { width: containerWidth }] = useMeasure<SVGSVGElement>();
  const { isTablet } = useThemeBreakpoints();
  const { t } = useTranslation();

  const computedGapRatio = useMemo(() => {
    const categories = props.xAxis?.[0]?.data ?? [];
    const count = categories.length;
    if (!count || count > COUNT_THRESHOLD || !containerWidth) return undefined;

    const plotWidth = Math.max(containerWidth - 50, 0); // 50 matches yAxis width below
    const step = plotWidth / count;
    if (step <= 0) return undefined;

    // Choose target bar width: full size when bar count is small, shrink linearly afterwards
    const shrinkPerItem = 4; // px reduced per extra bar after FULL_WIDTH_COUNT
    const targetWidth =
      count <= FULL_WIDTH_COUNT
        ? TARGET_BAR_WIDTH
        : Math.max(
            MIN_BAR_WIDTH,
            TARGET_BAR_WIDTH - (count - FULL_WIDTH_COUNT) * shrinkPerItem
          );

    const barWidth = Math.min(targetWidth, step);
    const gap = Math.max(step - barWidth, 0);
    const ratio = gap / (gap + barWidth || 1);

    return Math.max(0, Math.min(ratio, 1));
  }, [containerWidth, props.xAxis]);

  const xAxisWithGap =
    computedGapRatio == null || isTablet
      ? props.xAxis
      : props.xAxis?.map((axis, idx) =>
          idx === 0 ? { ...axis, categoryGapRatio: computedGapRatio } : axis
        );

  return (
    <MuiBarChart
      {...props}
      borderRadius={4}
      xAxis={xAxisWithGap}
      ref={containerRef}
      yAxis={[{ width: 100 }]}
      slotProps={{
        noDataOverlay: {
          message: t('portfolio.noData'),
        },
        legend: {
          direction: 'horizontal',
          position: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      }}
      axisHighlight={{
        x: 'none',
      }}
      grid={{ horizontal: true }}
    />
  );
}
