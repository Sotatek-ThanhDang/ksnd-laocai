import 'leaflet/dist/leaflet.css';

import { Box, useTheme } from '@mui/material';
import { yellow } from '@repo/common';
import { GeoJSON, MapContainer as BaseMap, TileLayer } from 'react-leaflet';

import {
  DEFAULT_COORD,
  DEFAULT_GEOJSON_STYLE,
  ZOOM_OPTIONS,
} from '@/common/map';
import {
  useHomeDispatchContext,
  useHomeStateContext,
} from '@/context/HomeContextProvider';
import laocaiProvince from '@/data/geojson/laocai/provice.json';
import laocaiWards from '@/data/geojson/laocai/ward';

import { DetailContainer } from './DetailContainer';
import { MapContainer } from './MapContainer';

export const MapPanel = () => {
  const theme = useTheme();
  const { data } = useHomeStateContext();

  const { setSelectedWard } = useHomeDispatchContext();

  function onEachFeatureWard(feature: any, layer: any) {
    layer.setStyle({
      ...DEFAULT_GEOJSON_STYLE,
      color: theme.palette.blue.main,
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
            : data.find((item) => item.id === feature.id)
        );
      },
    });
  }

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer>
        {(mapRef) => (
          <BaseMap
            ref={mapRef}
            center={DEFAULT_COORD}
            zoom={ZOOM_OPTIONS.DEFAULT}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON
              data={laocaiProvince as any}
              style={{
                ...DEFAULT_GEOJSON_STYLE,
                color: yellow[300],
                fillOpacity: 0.2,
              }}
            />
            {laocaiWards.map((ward) => (
              <GeoJSON
                key={ward.features[0].id}
                data={ward as any}
                onEachFeature={onEachFeatureWard}
              />
            ))}
          </BaseMap>
        )}
      </MapContainer>

      <DetailContainer />
    </Box>
  );
};
