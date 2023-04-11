import React, {useEffect} from 'react';
import CurrentCondition from '../model/CurrentCondition';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import axios from 'axios/index';
import GetCurrentWeather from './getCurrentWeather';

function GetFutureWeather() {
  const [futureWeather, setFutureWeather] = React.useState<CurrentCondition>();
  const latLong = GetCurrentLocation();
  const today = new Date();
  const expectedDate = new Date();
  expectedDate.setDate(today.getDate() + 14);

  useEffect(() => {
    latLong != undefined ? fetchData(latLong) : null;
  }, [latLong]);

  const fetchData = async (latLong: LocationData | undefined) => {
    await axios
      .get('https://api.weatherapi.com/v1/future.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${latLong?.latitude},${latLong?.longitude}`,
          lang: 'vi',
          dt: expectedDate.toISOString().slice(0, 10),
        },
      })
      .then(response => {
        setFutureWeather({
          condition_text: response.data.current.condition.text,
          temp_c: Math.round(parseInt(response.data.current.temp_c)),
          name: response.data.location.name,
          time: response.data.location.localtime,
          condition_code: response.data.current.condition.code,
          is_day: response.data.current.is_day,
        });
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return futureWeather;
}
export default GetFutureWeather;
