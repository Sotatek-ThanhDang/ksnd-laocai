import type { CssVarsThemeOptions } from '@mui/material/styles';

import { MuiAlert } from './allert';
import { MuiButton } from './button';
import { MuiChartsAxis } from './chartsAxis';
import { MuiChartsGrid } from './chartsGrids';
import { MuiCheckbox } from './checkbox';
import { MuiChip } from './chip';
import { MuiDataGrid } from './dataGrid';
import { MuiDatePicker } from './datePicker';
import { MuiDialog } from './dialog';
import { MuiFormControlLabel } from './formControlLabel';
import { MuiInputBase } from './inputBase';
import { MuiInputLabel } from './inputLabel';
import { MuiOutlinedInput } from './inputOutline';
import { MuiPagination } from './pagination';
import { MuiPickersOutlinedInput } from './pickerOutlinedInput';
import { MuiSelect } from './select';
import { MuiStepIcon, MuiStepLabel, MuiStepper } from './stepper';
import { MuiTab } from './tab';
import {
  MuiTable,
  MuiTableBody,
  MuiTableCell,
  MuiTableContainer,
  MuiTableHead,
  MuiTableRow,
} from './table';
import { MuiTabs } from './tabs';
import { MuiTextField } from './textField';

const components: CssVarsThemeOptions['components'] = {
  MuiButton,
  MuiChartsAxis,
  MuiChartsGrid,
  MuiTextField,
  MuiInputLabel,
  MuiPickersOutlinedInput,
  MuiOutlinedInput,
  MuiFormControlLabel,
  MuiCheckbox,
  MuiSelect,
  MuiInputBase,
  MuiDataGrid,
  MuiPagination,
  MuiChip,
  MuiDialog,
  MuiAlert,
  MuiTab,
  MuiTabs,
  MuiDatePicker,
  MuiStepper,
  MuiStepLabel,
  MuiStepIcon,
  MuiTableContainer,
  MuiTable,
  MuiTableHead,
  MuiTableRow,
  MuiTableCell,
  MuiTableBody,
};

export default components;
