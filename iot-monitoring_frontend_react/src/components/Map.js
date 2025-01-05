import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Tooltip, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapUpdater = ({ center, coordinates }) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            const bounds = coordinates.map(coord => [coord.latitude, coord.longitude]);
            map.fitBounds(bounds);
        } else {
            map.setView(center, 13);
        }
    }, [map, center, coordinates]);

    return null;
};

const Map = ({ coordinates, hoveredTimestamp }) => {
    const defaultCenter = [47.448048, 12.394831];
    const center = coordinates.length > 0 
        ? [coordinates[0].latitude, coordinates[0].longitude]
        : defaultCenter;

    const positions = coordinates.map(coord => [coord.latitude, coord.longitude]);

    const mapStyle = {
        position: 'absolute', 
        top: '80px', 
        right: '20px', 
        width: '690px', 
        height: '690px', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        marginTop: '0',
    };

    const recenterMap = (map) => {
        if (coordinates.length > 0) {
            const bounds = coordinates.map(coord => [coord.latitude, coord.longitude]);
            map.fitBounds(bounds);
        }
    };

    const CustomRecenterButton = () => {
        const map = useMap();

        return (
            <button
                onClick={() => recenterMap(map)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50px',
                    zIndex: 1000,
                    padding: '5px 10px',
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Recenter Map
            </button>
        );
    };

    return (
        <div style={mapStyle}>
            <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <CustomRecenterButton />
                <MapUpdater center={center} coordinates={coordinates} />

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {positions.length > 0 && (
                    <Polyline 
                        positions={positions} 
                        color="blue" 
                        weight={5} 
                    />
                )}

                {coordinates.map((coord, index) => {
                    const isHovered = coord.timestamp === hoveredTimestamp;
                    return (
                        <CircleMarker
                            key={index}
                            center={[coord.latitude, coord.longitude]}
                            radius={1}
                            color={isHovered ? "red" : "blue"}
                            fillColor={isHovered ? "red" : "blue"}
                            fillOpacity={0.2}
                            weight={1}
                        >
                            {isHovered && (
                                <Tooltip permanent={isHovered} direction="top" offset={[0, -3]} opacity={1}>
                                    <div>
                                        <p><strong>Timestamp:</strong> {coord.timestamp}</p>
                                        <p><strong>Altitude:</strong> {coord.altitude} m</p>
                                        <p><strong>Speed:</strong> {coord.speed} km/h</p>
                                        <p><strong>Heading:</strong> {coord.heading}°</p>
                                    </div>
                                </Tooltip>
                            )}
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;