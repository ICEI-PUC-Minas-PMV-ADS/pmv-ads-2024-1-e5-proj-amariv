import React from "react";
import { loader } from "src/AppMap";

/**
 * DefaultMapProps
 */

export type DefaultMapProps = React.ComponentProps<'div'> & {
  center: { lat: number, lon: number } | null,
  onCreateMap?: (map: google.maps.Map) => void,
};

/**
 * DefaultMap component
 */

export const DefaultMap = ({
  className = "w-[80%]",
  center,
  onCreateMap,
  ...props
}: DefaultMapProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = React.useState<number | undefined>();
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
  }, [map, onCreateMap]);

  React.useEffect(() => {
    if (containerRef.current) {
      if (!mapWidth) {
        setMapWidth(containerRef.current.clientWidth);
      }
    }
  }, [mapWidth]);

  /**
   * Layout
   */

  return (
    <div ref={containerRef} className='w-full' style={{ height: mapWidth ?? "0" }} {...props}>
      <div ref={mapRef} style={{ height: mapWidth ?? "0", width: mapWidth ?? "0" }}></div>
    </div>
  );
}
