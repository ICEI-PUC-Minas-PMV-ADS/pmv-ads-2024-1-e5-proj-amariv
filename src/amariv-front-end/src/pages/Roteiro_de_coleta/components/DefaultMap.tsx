import React from "react";
import { loader } from "../../../AppMap";

/**
 * MapProps
 */

export type MapProps = React.ComponentProps<'div'> & {
  height: string,
  center: { lat: number, lon: number } | null,
  onCreateMap?: (map: google.maps.Map) => void,
};

/**
 * DefaultMap
 */

export const DefaultMap = ({ height, center, onCreateMap, ...props }: MapProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = React.useState<number | undefined>();
  const [mapHeight, setMapHeight] = React.useState<number | undefined>();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  /**
   * Effects.
   */

  React.useLayoutEffect(() => {
    (async function () {
      if (mapRef.current && center && !map) {
        const { Map } = await loader.importLibrary("maps");
        const m = new Map(mapRef.current, {
          mapId: 'routeMap',
          disableDefaultUI: true,
          zoom: 13,
          center: { lat: center.lat, lng: center.lon },
          mapTypeControlOptions: {
            mapTypeIds: ["roadmap", "cleaned_roadmap"],
          },
        });

        const mapStyle = new google.maps.StyledMapType([
          { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
        ]);

        m.mapTypes.set("cleaned_roadmap", mapStyle);
        m.setMapTypeId("cleaned_roadmap");

        setMap(map);
        onCreateMap?.(m);
      }
    })();
  }, [map, center, onCreateMap]);

  React.useEffect(() => {
    if (containerRef.current) {
      if (!mapWidth) {
        setMapWidth(containerRef.current.clientWidth);
        setMapHeight(containerRef.current.clientHeight);
      }
    }
  }, [mapWidth]);

  /**
   * Layout
   */

  return (
    <div ref={containerRef} {...props} className="w-full mt-[2rem] bg-gray-400" style={{ height }}>
      <div ref={mapRef} style={{ height: mapHeight ?? "0", width: mapWidth ?? "0" }}></div>
    </div>
  );
};