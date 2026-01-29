import { DATE_FORMAT_VI } from '../../../common';
import type { MuiComponent } from '../type';

export const MuiDatePicker: MuiComponent<'MuiDatePicker'> = {
  defaultProps: {
    format: DATE_FORMAT_VI,
  },
};
