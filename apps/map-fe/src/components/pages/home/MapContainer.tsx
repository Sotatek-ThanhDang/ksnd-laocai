import L, { type Map as LeafletMap } from 'leaflet';
import {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';

import { DEFAULT_COORD, ZOOM_OPTIONS } from '@/common/map';
import { useHomeStateContext } from '@/context/HomeContextProvider';
import laocaiWards from '@/data/geojson/laocai/ward';

type MapContainerProps = {
  children: (mapRef: MutableRefObject<LeafletMap | null>) => ReactNode;
};

export function MapContainer({ children }: MapContainerProps) {
  const { selectedWard } = useHomeStateContext();

  const mapRef = useRef<LeafletMap | null>(null);

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
  }, [selectedWard?.id]);

  return children(mapRef);
}
