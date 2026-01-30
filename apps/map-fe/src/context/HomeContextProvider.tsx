/* eslint-disable react-refresh/only-export-components */
import L from 'leaflet';
import React, {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DEFAULT_COORD, ZOOM_OPTIONS } from '@/common/map';
import laocaiWards from '@/data/geojson/laocai/ward';
import type { Ward } from '@/types/home';

import { useMapContext } from './MapContextProvider';

type HomeContextState = {
  selectedWard: Ward | undefined;
};
type HomeContextDispatch = {
  setSelectedWard: Dispatch<SetStateAction<Ward | undefined>>;
};

const HomeStateContext = createContext<HomeContextState | undefined>(undefined);
const HomeDispatchContext = createContext<HomeContextDispatch | undefined>(
  undefined
);

export const HomeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mapRef } = useMapContext();
  const [selectedWard, setSelectedWard] = useState<Ward | undefined>();

  const contextState = useMemo(() => ({ selectedWard }), [selectedWard]);

  const contextDispatch = useMemo(
    () => ({ setSelectedWard }),
    [setSelectedWard]
  );

  useEffect(() => {
    const selectedWardId = selectedWard?.id;
    if (!mapRef.current) return;

    if (!selectedWardId) {
      mapRef.current.flyTo(DEFAULT_COORD, ZOOM_OPTIONS.DEFAULT);
    }

    const selected = laocaiWards.find(
      (item) => item.features[0].id === selectedWardId
    );

    if (!selected) return;

    const geoJsonLayer = L.geoJSON(selected as any);
    const center = geoJsonLayer.getBounds().getCenter();

    mapRef.current.flyTo(center, ZOOM_OPTIONS.FOCUS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWard?.id]);

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
