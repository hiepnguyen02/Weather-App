import React, {useEffect} from 'react';
import getLocationService from './getLocationService';
import axios from 'axios';
import getLocationId from './getLocationId';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import GetLocationId from './getLocationId';

function GetCurrentWeather() {
  const [currentCondition, setCurrentCondition] = React.useState<string>();
  const locationId = GetLocationId();
  useEffect(() => {
    locationId != undefined ? fetchData(locationId) : null;
  }, [locationId]);

  const fetchData = async (locationId: number) => {
    await axios
      .get(
        'https://dataservice.accuweather.com/forecasts/v1/daily/1day/' +
          locationId,
        {
          params: {
            apikey: 'VSle6AAPqgsI309rokk46t1A3i9O6oCk',
          },
        },
      )
      .then(response => {
        console.log(response.data);
        setCurrentCondition(response.data);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return currentCondition;
}
export default GetCurrentWeather;
