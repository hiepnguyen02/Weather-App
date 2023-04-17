import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import City from '../model/City';
import ForecastDay from '../model/ForecastDay';

function GetSavedLocation(lat: number, lon: number) {
  const [savedLocationDetails, setSavedLocationDeatail] =
    React.useState<ForecastDay>();

  useEffect(() => {
    console.log('jshsh');
    lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  }, [lat, lon]);

  const fetchData = async (lat: number, lon: number) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${lat},${lon}`,
        },
      })
      .then(response => {
        response.data != undefined
          ? setSavedLocationDeatail(response.data)
          : null;
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return savedLocationDetails;
}
export default GetSavedLocation;
