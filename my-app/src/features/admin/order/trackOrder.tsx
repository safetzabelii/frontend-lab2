import { useEffect, useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript } from '@react-google-maps/api';
import { observer } from 'mobx-react';
  
interface TrackOrderProps {
    to: string;
  }
  
  export default observer(function TrackOrder({ to }: TrackOrderProps) {
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [from, setFrom] = useState<google.maps.LatLngLiteral | null>(null);
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
  
    useEffect(() => {
      if (currentPosition) {
        setFrom(currentPosition);
      }
    }, [currentPosition]);
  
    const mapStyles = {
      height: '400px',
      width: '100%'
    };
  
    const defaultCenter = currentPosition || { lat: 42.5833, lng: 20.9030 };
    const defaultZoom = currentPosition ? 17 : 13;
  
    const getDirections = () => {
      if (!from) {
        console.error('Unable to get current location.');
        return;
      }
  
      const request = {
        origin: from,
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
            value={from ? `${from.lat}, ${from.lng}` : ''}
            readOnly
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            readOnly
          />
          <button onClick={getDirections}>Get Directions</button>
          <LoadScript googleMapsApiKey="AIzaSyB8JlKm4cgnFKOmML_8eF4GPWAXrTk726M">
            {currentPosition && (
              <div>
                <p>Current Location: {currentPosition.lat}, {currentPosition.lng}</p>
                <p>To: {to}</p>
                <button onClick={getDirections}>Get Directions</button>
              </div>
            )}
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