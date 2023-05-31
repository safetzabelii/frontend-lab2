import { useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, LoadScript } from '@react-google-maps/api';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
interface TrackOrderProps {
    destination: string;
  }
export default observer(function TrackOrder({ destination }:TrackOrderProps) {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [to, setTo] = useState(destination);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);


  useEffect(() => {
   
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const mapStyles = {
    height: '400px',
    width: '800px'
  };

  const defaultCenter = currentPosition || { lat: 42.5833, lng: 20.9030 };
  const defaultZoom = currentPosition ? 17 : 13;

  const getDirections = () => {
    const request = {
      origin: currentPosition ? currentPosition : '',
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(response);
      } else {
        console.error('Error getting directions:', status);
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="From"
        value={currentPosition ? `${currentPosition.lat}, ${currentPosition.lng}` : ''}
        readOnly
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        readOnly
      />
      <button onClick={getDirections}>Get Directions</button>
      <LoadScript googleMapsApiKey="AIzaSyDWd1i10PCEKjUOgAeqj3Tz9Tj2x6_Omvk">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={defaultZoom}
          center={defaultCenter}
        >
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});
