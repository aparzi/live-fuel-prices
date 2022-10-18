import React from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup, useMap
} from 'react-leaflet';
import {LatLng} from "leaflet";
import './map.css';
import L from 'leaflet';
import {IGeographicInfo} from "../../models/interfaces/IGeographicInfo";
import {IResult} from "../../models/interfaces/IResults";
import { For } from 'react-loops';

// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const RecenterAutomatically = ({lat, lng}: {lat: number, lng: number}) => {
    const map = useMap();
    map.setView([lat, lng]);
    return null;
}

function Map({geographicInfo, records}: {geographicInfo: IGeographicInfo | undefined, records: Array<IResult>}) {
    const position = new LatLng(geographicInfo?.lat ?? 41.903853714205006, geographicInfo?.lng ?? 12.484492585565903);

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <For of={records} as={(item: IResult) =>
                <Marker position={new LatLng(item?.location?.lat, item?.location?.lng)}>
                    <Popup>
                        {item?.address}
                    </Popup>
                </Marker>
            }/>
            <RecenterAutomatically lat={position?.lat} lng={position?.lng} />
        </MapContainer>
    )
}

export default Map;