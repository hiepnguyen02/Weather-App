import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import ForecastDay from '../model/ForecastDay';

function GetSavedLocationDetail(
  lat: number | undefined,
  lon: number | undefined,
) {
  const [detail, setDetails] = useState<ForecastDay>();
  // const latLong = GetCurrentLocation();
  // useEffect(() => {
  //   lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  // }, [lat, lon]);
  // let result: ForecastDay[] = [];

  const fetchData = async (lat: number, lon: number) => {
    await axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${lat},${lon}`,
          lang: 'vi',
        },
      })
      .then(response => {
        setDetails({
          maxTemp_c: response.data.forecast.forecastday[0].day.maxtemp_c,
          minTemp_c: response.data.forecast.forecastday[0].day.mintemp_c,

          date: '',
          avgTemp_c: response.data.current.temp_c,

          condition_code: 0,
          name: response.data.location.name,
          region: response.data.location.country,
          condition_text: response.data.current.condition.text,
          icon_link: response.data.current.condition.icon,
        });
      })

      .catch(error => {
        console.error('Network error:', error);
      });
  };
  useEffect(() => {
    lat != undefined && lon != undefined ? fetchData(lat, lon) : null;
  }, [lat, lon]);

  return detail;
}
export default GetSavedLocationDetail;
