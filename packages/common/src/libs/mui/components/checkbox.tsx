import { CheckedCheckboxIcon } from '../../../components/common/icons/CheckedCheckboxIcon';
import { UncheckCheckboxIcon } from '../../../components/common/icons/UncheckCheckboxIcon';
import type { MuiComponent } from '../type';

export const MuiCheckbox: MuiComponent<'MuiCheckbox'> = {
  defaultProps: {
    disableRipple: true,
    disableFocusRipple: true,
    color: 'primary',
    icon: (
      <UncheckCheckboxIcon
        sx={{ color: (theme) => theme.palette.border.primary }}
      />
    ),
    checkedIcon: <CheckedCheckboxIcon />,
    size: 'small',
  },
  styleOverrides: {
    root: () => ({}),
  },
};
