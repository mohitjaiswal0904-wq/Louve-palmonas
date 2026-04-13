"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { SessionGeoMapPoint } from "@/types";

function toGeoJSON(points: SessionGeoMapPoint[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: points.map((p) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [p.lon, p.lat] },
      properties: { weight: p.weight, label: p.label || `${p.lat.toFixed(2)}, ${p.lon.toFixed(2)}` },
    })),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SessionGeoMapHandle = {
  fitIndia: () => void;
  fitWorld: () => void;
};

type Props = {
  accessToken: string;
  points: SessionGeoMapPoint[];
  className?: string;
};

export const SessionGeoMap = forwardRef<SessionGeoMapHandle, Props>(function SessionGeoMap(
  { accessToken, points, className },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useImperativeHandle(ref, () => ({
    fitIndia: () => {
      const map = mapRef.current;
      if (!map) return;
      map.fitBounds(
        [
          [68.2, 6.5],
          [97.8, 35.9],
        ],
        { padding: 40, duration: 900, maxZoom: 6 },
      );
    },
    fitWorld: () => {
      const map = mapRef.current;
      if (!map) return;
      map.flyTo({ center: [20, 24], zoom: 1.35, duration: 900 });
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [78.96, 22.59],
      zoom: 2.4,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: true });

    map.on("load", () => {
      map.addSource("session-hits", {
        type: "geojson",
        data: toGeoJSON(points),
      });
      map.addLayer({
        id: "session-hits-glow",
        type: "circle",
        source: "session-hits",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "weight"],
            1,
            14,
            5,
            22,
            40,
            36,
            200,
            58,
          ],
          "circle-color": "#9a3412",
          "circle-opacity": 0.22,
          "circle-blur": 0.75,
        },
      });
      map.addLayer({
        id: "session-hits-core",
        type: "circle",
        source: "session-hits",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "weight"],
            1,
            5,
            5,
            10,
            40,
            20,
            200,
            32,
          ],
          "circle-color": "#ea580c",
          "circle-opacity": 0.88,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fed7aa",
        },
      });

      map.on("click", "session-hits-core", (e) => {
        const f = e.features?.[0];
        if (!f?.properties) return;
        const label = String(f.properties.label ?? "");
        const weight = Number(f.properties.weight ?? 0);
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="p-2 text-xs text-zinc-900"><p class="font-semibold">${escapeHtml(label)}</p><p class="mt-1 tabular-nums">${weight} activity events (bucketed)</p></div>`,
          )
          .addTo(map);
      });
    });

    return () => {
      popup.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [accessToken]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getSource("session-hits")) return;
    const src = map.getSource("session-hits") as mapboxgl.GeoJSONSource;
    src.setData(toGeoJSON(points));
  }, [points]);

  return <div ref={containerRef} className={className ?? "min-h-[420px] w-full rounded-xl"} />;
});
