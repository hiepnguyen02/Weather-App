import axios from 'axios';
import React, {useEffect} from 'react';
import getLocationService from './getLocationService';
import LocationData from '../model/LocationData';
import GetCurrentLocation from './getLocationService';

function GetLocationId() {
  const [locationId, setLocationId] = React.useState<number>();
  const latLong = GetCurrentLocation();
  useEffect(() => {
    latLong != undefined ? fetchData(latLong) : null;
  }, [latLong]);

  const fetchData = async (latLong: LocationData | undefined) => {
    await axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${latLong?.latitude},${latLong?.longitude}`,
        },
      })
      .then(response => {
        setLocationId(response.data.current.condition.text);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };

  return locationId;
}
export default GetLocationId;
