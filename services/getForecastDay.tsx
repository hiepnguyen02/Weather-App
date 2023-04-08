import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import ForecastDay from '../model/ForecastDay';

function GetForecastDay() {
  const [forecastDay, setForecastDay] = React.useState<ForecastDay>();

  const latLong = GetCurrentLocation();
  useEffect(() => {
    latLong != undefined ? fetchData(latLong) : null;
  }, [latLong]);

  const fetchData = async (latLong: LocationData | undefined) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${latLong?.latitude},${latLong?.longitude}`,
          lang: 'vi',
        },
      })
      .then(response => {
        setForecastDay({
          maxTemp_c: Math.round(
            parseInt(response.data.forecast.forecastday[0].day.maxtemp_c),
          ),
          minTemp_c: parseInt(
            response.data.forecast.forecastday[0].day.mintemp_c,
          ),
        });
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return forecastDay;
}
export default GetForecastDay;
