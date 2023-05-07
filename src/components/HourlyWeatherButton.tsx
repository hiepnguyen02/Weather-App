import {Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HourlyWeather from '../../model/HourlyWeather';

function HourlyWeatherButton(
  hourlyWeather: any,
  key: any,
  isHourlyButton: boolean,
) {
  const day = hourlyWeather.hourlyWeather?.is_day;
  const code = hourlyWeather.isHourlyButton
    ? hourlyWeather.hourlyWeather?.condition_code
    : hourlyWeather.hourlyWeather.condition_code;
  // const img = require(hourlyWeather.hourlyWeather
  //   ? hourlyWeather.hourlyWeather?.icon_link
  //   : 0);
  // console.log(img);
  return (
    <View style={styles.container}>
      <Text style={styles.hours}>
        {!hourlyWeather.isHourlyButton ? 'ngày ' : null}
        {hourlyWeather.isHourlyButton
          ? hourlyWeather.hourlyWeather?.time?.slice(11, 13)
          : hourlyWeather?.hourlyWeather.date?.slice(8, 10)}
        {hourlyWeather.isHourlyButton ? ' giờ' : null}
      </Text>
      <Image
        source={{
          uri: `https:${hourlyWeather.hourlyWeather.icon_link}`,
        }}
        style={{height: 60, width: 60}}
      />
      <Text style={{color: Colors.white}}>
        {Math.round(
          hourlyWeather.isHourlyButton
            ? hourlyWeather.hourlyWeather.temp_c
            : hourlyWeather.hourlyWeather.avgTemp_c,
        )}
        °
      </Text>
    </View>
  );
}
export default HourlyWeatherButton;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    height: 146,
    width: 64,
    borderRadius: 30,
    backgroundColor: 'rgba(34, 80, 150, 0.3)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255, 0.2)',
    opacity: 1,
  },
  hours: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.white,
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
  },
});
