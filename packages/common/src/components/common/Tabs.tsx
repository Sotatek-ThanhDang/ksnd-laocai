import Box from '@mui/material/Box';
import Tab, { type TabProps } from '@mui/material/Tab';
import TabList from '@mui/material/Tabs';
import {
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useState,
} from 'react';

import { AccessControl } from '../layout/AccessControl';

type TabsProps = {
  defaultValue?: number;
  tabs: {
    label: string;
    labelProps?: Omit<TabProps, 'id' | 'area-control'>;
    component: ReactNode;
    count?: number;
    permission?: string[];
  }[];
  onChangeTab?: (value: number) => void;
  actions?: React.ReactNode;
};

export default function Tabs({
  defaultValue = 0,
  tabs,
  onChangeTab,
  actions,
}: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (_: SyntheticEvent, newValue: number) => {
      setValue(newValue);
      onChangeTab?.(newValue);
    },
    [onChangeTab]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <TabList
          value={value}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {tabs.map((tab, idx) => (
            <AccessControl
              allowedPermissions={tab.permission ?? []}
              key={`tab_trigger_${tab.label}`}
            >
              <Tab
                key={`tab_trigger_${tab.label}`}
                {...a11yProps(idx)}
                label={tab.label}
                {...tab.labelProps}
                sx={{ gap: 1, mr: 1.5 }}
                onClick={(e) => {
                  handleChange(e, idx);
                }}
              />
            </AccessControl>
          ))}
        </TabList>
        {actions}
      </Box>

      {tabs.map((tab, idx) => (
        <CustomTabPanel
          key={`tab_panel_${tab.label}`}
          value={value}
          index={idx}
        >
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

type TabPanelProps = React.PropsWithChildren<{
  index: number;
  value: number;
}>;

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
