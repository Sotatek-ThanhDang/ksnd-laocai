import { alpha } from '@mui/material';
import { getRandomColor, yellow } from '@repo/common';
import { memo, type ReactNode, useCallback } from 'react';
import { GeoJSON, MapContainer as LeafeatMap, TileLayer } from 'react-leaflet';

import {
  DEFAULT_COORD,
  DEFAULT_GEOJSON_STYLE,
  SELECTED_GEOJSON_STYLE,
  ZOOM_OPTIONS,
} from '@/common/map';
import {
  useHomeDispatchContext,
  useHomeStateContext,
} from '@/context/HomeContextProvider';
import { useMapContext } from '@/context/MapContextProvider';
import laocaiProvince from '@/data/geojson/laocai/provice.json';
import laocaiGeoJSONWards from '@/data/geojson/laocai/ward';
import laocaiWards from '@/data/laocai_wards.json';

export function MapContainer() {
  const { selectedWard } = useHomeStateContext();
  const { setSelectedWard } = useHomeDispatchContext();

  const onEachFeatureWard = useCallback(
    (feature: any, layer: any) => {
      let selectedId: string | undefined;
      const id = feature?.id;

      layer.on({
        mouseover: (e: any) => {
          const l = e.target;

          l.setStyle({
            ...DEFAULT_GEOJSON_STYLE,
            fillOpacity: SELECTED_GEOJSON_STYLE.fillOpacity - 0.2,
          });
        },
        mouseout: (e: any) => {
          setSelectedWard((pre) => {
            selectedId = pre?.id;
            return pre;
          });

          const isSelected = selectedId === id;
          const l = e.target;

          const style = isSelected
            ? SELECTED_GEOJSON_STYLE
            : DEFAULT_GEOJSON_STYLE;

          l.setStyle({ ...style });
        },
        click: (e: any) => {
          const clickedLayer = e.target;

          // Lấy tọa độ trung tâm từ Bounds của layer
          const center = clickedLayer.getBounds().getCenter();

          e.target._map.flyTo(center, ZOOM_OPTIONS.FOCUS);

          setSelectedWard((pre) =>
            pre?.id === id
              ? undefined
              : laocaiWards.find((item) => item.id === id)
          );
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedWard?.id]
  );

  return (
    <BaseMap>
      <GeoJSON
        data={laocaiProvince as any}
        style={{
          ...DEFAULT_GEOJSON_STYLE,
          color: yellow[300],
          weight: 3,
          fillOpacity: 0.2,
        }}
      />
      {laocaiGeoJSONWards.map((ward) => (
        <GeoJSON
          key={ward.features[0].id}
          data={ward as any}
          onEachFeature={onEachFeatureWard}
          style={{
            ...(ward.features[0].id === selectedWard?.id
              ? SELECTED_GEOJSON_STYLE
              : DEFAULT_GEOJSON_STYLE),
            color: alpha(getRandomColor(), Math.max(0.4, Math.random())),
          }}
        />
      ))}
    </BaseMap>
  );
}

const BaseMap = memo(
  ({ children: extendComponents }: { children: ReactNode }) => {
    const { mapRef } = useMapContext();

    return (
      <LeafeatMap
        ref={mapRef}
        center={DEFAULT_COORD}
        zoom={ZOOM_OPTIONS.DEFAULT - 0.25}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={18}
          attribution="&copy; Google Maps"
        />
        {extendComponents}
      </LeafeatMap>
    );
  }
);
