// src/components/ui/WorldMap.jsx

import React, { memo } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  ZoomableGroup 
} from "react-simple-maps";
import { GEO_URL } from '../../data/constants';
import COUNTRIES from '../../data/countries';

const WorldMap = memo(({ activeCountry, onSelectCountry, disabled }) => {
  return (
    <div className="relative w-full h-[420px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 350,
          center: [40, 30]
        }}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup center={[40, 30]} zoom={1} minZoom={0.5} maxZoom={4}>
          {/* Country geometries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isFocusCountry = Object.values(COUNTRIES).some(
                  c => geo.properties.name === c.name || 
                       geo.id === c.id ||
                       (c.name === "United Kingdom" && geo.properties.name === "United Kingdom")
                );
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isFocusCountry ? "#3b4a6b" : "#1e293b"}
                    stroke="#334155"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isFocusCountry ? "#4b5e8a" : "#2a3a52",
                        outline: "none",
                        cursor: isFocusCountry ? "pointer" : "default"
                      },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>
          
          {/* Country Markers */}
          {Object.values(COUNTRIES).map((country) => {
            const isActive = activeCountry?.id === country.id;
            
            return (
              <Marker
                key={country.id}
                coordinates={country.coordinates}
                onClick={() => !disabled && onSelectCountry(country)}
              >
                <g style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
                {/* Animated pulse rings for active country */}
                {isActive && (
                  <>
                    <circle r={20} fill="none" stroke="#6366f1" strokeWidth={2} opacity={0.6}>
                      <animate attributeName="r" values="12;28;12" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r={16} fill="none" stroke="#6366f1" strokeWidth={1.5} opacity={0.4}>
                      <animate attributeName="r" values="16;32;16" dur="2s" repeatCount="indefinite" begin="0.3s" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                  </>
                )}
                
                {/* Outer marker circle */}
                <circle
                  r={isActive ? 14 : 10}
                  fill={isActive ? "#6366f1" : "#475569"}
                  stroke={isActive ? "#a5b4fc" : "#64748b"}
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-all duration-300"
                  filter={isActive ? "url(#glow)" : undefined}
                />
                
                {/* Inner circle */}
                <circle r={isActive ? 10 : 7} fill={isActive ? "#818cf8" : "#64748b"} />
                
                {/* Flag text */}
                <text
                  textAnchor="middle"
                  y={4}
                  style={{ fontSize: isActive ? "12px" : "10px", fontFamily: "system-ui", pointerEvents: "none" }}
                >
                  {country.flag}
                </text>
                
                {/* Country label */}
                <g transform={`translate(0, ${isActive ? -28 : -22})`}>
                  <rect
                    x={-35}
                    y={-10}
                    width={70}
                    height={18}
                    rx={4}
                    fill={isActive ? "#6366f1" : "#1e293b"}
                    stroke={isActive ? "#a5b4fc" : "#475569"}
                    strokeWidth={1}
                    opacity={isActive ? 1 : 0.8}
                  />
                  <text
                    textAnchor="middle"
                    y={3}
                    fill="white"
                    style={{ fontSize: "10px", fontWeight: "bold", fontFamily: "system-ui" }}
                  >
                    {country.name}
                  </text>
                </g>
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
        
        {/* SVG Filters */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </ComposableMap>
      
      {/* Grid overlay for tech aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500 ring-2 ring-indigo-300 flex items-center justify-center text-[8px]">📍</div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span>Case Study</span>
          </div>
          <div className="text-slate-600">|</div>
          <span className="text-slate-500">Click a marker to select jurisdiction</span>
        </div>
      </div>
      
      {/* Coordinates display */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded px-3 py-1.5 border border-slate-700 font-mono text-xs">
        <span className="text-slate-500">LAT:</span>{' '}
        <span className="text-indigo-400">{activeCountry.coordinates[1].toFixed(2)}°</span>
        <span className="text-slate-600 mx-2">|</span>
        <span className="text-slate-500">LNG:</span>{' '}
        <span className="text-indigo-400">{activeCountry.coordinates[0].toFixed(2)}°</span>
      </div>
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
