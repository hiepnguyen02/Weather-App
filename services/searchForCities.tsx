import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';
import City from '../model/City';

function SearchForCities(text: string) {
  const citiesListArr: City[] = [];
  const [loading, setLoading] = React.useState<boolean>();
  const [citiesList, setCitiesList] = React.useState<City[]>();

  useEffect(() => {
    text != undefined && text != null && text != '' ? fetchData(text) : null;
  }, [text]);

  const fetchData = async (text: string | undefined) => {
    setLoading(true);
    await axios
      .get('https://api.weatherapi.com/v1/search.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${text}`,
        },
      })
      .then(response => {
        response.data.map(a => {
          citiesListArr.push({
            id: a.id,
            name: a.name,
            country: a.country,
            lat: a.lat,
            lon: a.lon,
          });
        });
        setCitiesList(citiesListArr);
        setLoading(false);
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return [citiesList, loading];
}
export default SearchForCities;
