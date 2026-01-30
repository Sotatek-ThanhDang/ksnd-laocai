/* eslint-disable react-refresh/only-export-components */
import { type Map as LeafletMap } from 'leaflet';
import {
  createContext,
  type MutableRefObject,
  type ReactNode,
  useContext,
  useRef,
} from 'react';

const MapContext = createContext<{
  mapRef: MutableRefObject<LeafletMap | null>;
} | null>(null);

export function MapContextProvider({ children }: { children: ReactNode }) {
  const ref = useRef<LeafletMap | null>(null);

  return (
    <MapContext.Provider value={{ mapRef: ref }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
};
