/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Ward } from '@/types/home';

type HomeContextState = {
  selectedWard: Ward | undefined;
  data: Ward[];
};
type HomeContextDispatch = {
  setSelectedWard: Dispatch<SetStateAction<Ward | undefined>>;
};

const HomeStateContext = createContext<HomeContextState | undefined>(undefined);
const HomeDispatchContext = createContext<HomeContextDispatch | undefined>(
  undefined
);

const WARD_ROWS: Ward[] = [
  {
    id: 'xa3321.977',
    order: 1,
    name: 'A Mú Sung (xã)',
    previous: 'Xã Nậm Chạc, Xã A Mú Sung',
  },
  {
    id: 'xa3321.847',
    order: 2,
    name: 'Âu Lâu (phường)',
    previous: 'Phường Hợp Minh, Xã Giới Phiên, Xã Minh Quân, Xã Âu Lâu',
  },
  {
    id: 'xa3321.931',
    order: 3,
    name: 'Bắc Hà (xã)',
    previous:
      'Thị trấn Bắc Hà, Xã Na Hối, Xã Thải Giàng Phố, Xã Bản Phố, Xã Hoàng Thu Phố, Xã Nậm Mòn',
  },
];

export const HomeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedWard, setSelectedWard] = useState<Ward | undefined>();

  const contextState = useMemo(
    () => ({ selectedWard, data: WARD_ROWS }),
    [selectedWard]
  );

  const contextDispatch = useMemo(
    () => ({ setSelectedWard }),
    [setSelectedWard]
  );

  return (
    <HomeStateContext.Provider value={contextState}>
      <HomeDispatchContext.Provider value={contextDispatch}>
        {children}
      </HomeDispatchContext.Provider>
    </HomeStateContext.Provider>
  );
};

export const useHomeStateContext = () => {
  const context = useContext(HomeStateContext);
  if (!context) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
};

export const useHomeDispatchContext = () => {
  const context = useContext(HomeDispatchContext);
  if (!context) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }
  return context;
};
