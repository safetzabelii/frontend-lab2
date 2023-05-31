//AIzaSyDWd1i10PCEKjUOgAeqj3Tz9Tj2x6_Omvk

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';

interface TrackOrderProps {
  destination: string;
  orderId: string;
}

export default observer(function TrackOrder({ destination, orderId }: TrackOrderProps) {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [to, setTo] = useState(destination);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [firstEmailSent, setFirstEmailSent] = useState(false);
  const [secondEmailSent, setSecondEmailSent] = useState(false);
  const {orderStore} = useStore();
  const {sendEmailForOrderStatusToCustomer} = orderStore;

  const handlePositionUpdate = (position: GeolocationPosition) => {
    setCurrentPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (position: GeolocationPosition) => {
      handlePositionUpdate(position);
    };

    const error = (err: GeolocationPositionError) => {
      console.error(err);
    };

    const watchId = navigator.geolocation.watchPosition(success, error, options);

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const mapStyles = {
    height: '400px',
    width: '800px',
  };

  const defaultCenter = currentPosition || { lat: 42.5833, lng: 20.9030 };
  const defaultZoom = currentPosition ? 17 : 13;

  const getDirections = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: to }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results!.length > 0) {
        const request = {
          origin: currentPosition || '',
          destination: results![0].geometry.location,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(request, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(response);
            setTrackingEnabled(true); // Enable tracking after receiving directions
          } else {
            console.error('Error getting directions:', status);
          }
        });
      } else {
        console.error('Error geocoding destination:', status);
      }
    });
  };

  const calculateDistance = (pos1: google.maps.LatLng, pos2: google.maps.LatLng): number => {
    const lat1 = pos1.lat();
    const lng1 = pos1.lng();
    const lat2 = pos2.lat();
    const lng2 = pos2.lng();
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    let trackingInterval: NodeJS.Timeout | null = null;

    if (trackingEnabled) {
      trackingInterval = setInterval(() => {
        getDirections();
      }, 5000); // Update directions every 5 seconds (adjust the interval as needed)
    }

    return () => {
      if (trackingInterval) {
        clearInterval(trackingInterval);
      }
    };
  }, [trackingEnabled]);

  useEffect(() => {
    if (directions && currentPosition) {
      const legs = directions.routes[0].legs;
      const distanceToDestination = calculateDistance(
        new google.maps.LatLng(currentPosition),
        new google.maps.LatLng(legs[legs.length - 1].end_location)
      );
      const distanceToDestinationMeters = distanceToDestination * 1000;

      if (distanceToDestinationMeters <= 1000 && !firstEmailSent) {
        // Send email only if it hasn't been sent before
        console.log('Current location is 1 kilometer or less from the destination');
        sendEmailForOrderStatusToCustomer(orderId, distanceToDestinationMeters);
        setFirstEmailSent(true);
      }
      if (distanceToDestinationMeters <= 20 && !secondEmailSent) {
        console.log('Current location is 20 meters or less from the destination');
        sendEmailForOrderStatusToCustomer(orderId, distanceToDestinationMeters);
        setSecondEmailSent(true);
      }
    }
  }, [directions, currentPosition, firstEmailSent, secondEmailSent]);

  return (
    <div>
      <input
        type="text"
        placeholder="From"
        value={currentPosition ? `${currentPosition.lat}, ${currentPosition.lng}` : ''}
        readOnly
      />
      <input type="text" placeholder="To" value={to} readOnly />
      <button onClick={getDirections}>Get Directions</button>
      <LoadScript googleMapsApiKey="AIzaSyDWd1i10PCEKjUOgAeqj3Tz9Tj2x6_Omvk">
        <GoogleMap mapContainerStyle={mapStyles} zoom={defaultZoom} center={currentPosition || defaultCenter}>
          {currentPosition && <Marker position={currentPosition} />}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                suppressMarkers: false,
                preserveViewport: true,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});
