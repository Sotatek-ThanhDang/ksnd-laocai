/* eslint-disable react-hooks/exhaustive-deps */
import { alpha } from '@mui/material';
import { getRandomColor, yellow } from '@repo/common';
import { useCallback } from 'react';
import { GeoJSON, MapContainer as BaseMap, TileLayer } from 'react-leaflet';

import {
  DEFAULT_COORD,
  DEFAULT_GEOJSON_STYLE,
  ZOOM_OPTIONS,
} from '@/common/map';
import { useHomeDispatchContext } from '@/context/HomeContextProvider';
import { useMapContext } from '@/context/MapContextProvider';
import laocaiProvince from '@/data/geojson/laocai/provice.json';
import laocaiGeoJSONWards from '@/data/geojson/laocai/ward';
import laocaiWards from '@/data/laocai_wards.json';

export function MapContainer() {
  const { mapRef } = useMapContext();

  const { setSelectedWard } = useHomeDispatchContext();

  const onEachFeatureWard = useCallback(
    (feature: any, layer: any) => {
      layer.setStyle({
        ...DEFAULT_GEOJSON_STYLE,
        color: alpha(getRandomColor(), Math.random()),
      });

      layer.on({
        mouseover: (e: any) => {
          const l = e.target;
          l.setStyle({ ...DEFAULT_GEOJSON_STYLE, fillOpacity: 0.5 });
        },
        mouseout: (e: any) => {
          const l = e.target;
          l.setStyle({ ...DEFAULT_GEOJSON_STYLE });
        },
        click: (e: any) => {
          const clickedLayer = e.target;

          // Lấy tọa độ trung tâm từ Bounds của layer
          const center = clickedLayer.getBounds().getCenter();

          e.target._map.flyTo(center, ZOOM_OPTIONS.FOCUS);

          setSelectedWard((pre) =>
            pre?.id === feature.id
              ? undefined
              : laocaiWards.find((item) => item.id === feature.id)
          );
        },
      });
    },
    [setSelectedWard]
  );

  const renderMemorizeMap = useCallback(
    () => (
      <BaseMap
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
        <GeoJSON
          data={laocaiProvince as any}
          style={{
            ...DEFAULT_GEOJSON_STYLE,
            color: yellow[300],
            fillOpacity: 0.2,
          }}
        />
        {laocaiGeoJSONWards.map((ward) => (
          <GeoJSON
            key={ward.features[0].id}
            data={ward as any}
            onEachFeature={onEachFeatureWard}
          />
        ))}
      </BaseMap>
    ),
    [onEachFeatureWard]
  );

  return <>{renderMemorizeMap()}</>;
}
