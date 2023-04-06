import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

function GetCurrentLocation() {
  const [location, setLocation] = React.useState<LocationData>();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return location;
}
export default GetCurrentLocation;
