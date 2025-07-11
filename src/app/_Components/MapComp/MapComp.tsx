'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'



const DefaultIcon = L.icon({
  iconUrl: '/images/leaflet/marker-icon.png', 
  shadowUrl: '/images/leaflet/marker-shadow.png',
  iconSize: [25, 41], 
  iconAnchor: [12, 41], // position relative to icon's tip
  popupAnchor: [1, -34], // position of popup relative to icon
  shadowSize: [41, 41], 
});

L.Marker.prototype.options.icon = DefaultIcon;
export default function MapComp(){


    const position: [number, number] = [30.033333, 31.233334]; 

    return (
        <>

            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-[90%] md:w-[75%] lg:w-[50%] h-[300px] sm:h-[400px] md:h-[500px] rounded-lg z-0 m-5">
                
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />

                {/* Marker is the pin icon, placed at the `position` */}
                <Marker position={position}>
                    {/* Popup is a message that appears on click */}
                    <Popup>
                    You are here! <br /> Cairo Center
                    </Popup>
                </Marker>
            </MapContainer>
     
               
        </>
    )
}