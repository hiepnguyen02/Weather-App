import {Text, View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  BlackCloud,
  BlackCloudAndRain,
  Cloud,
  CloudAndMoon,
  CloudAndRain,
  CloudAndRainAndMoon,
  CloudAndRainAndSun,
  CloudAndSun,
  Moon,
  Sun,
} from '../img';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HourlyWeather from '../../model/HourlyWeather';

function HourlyWeatherButton(hourlyWeather: any, key: any) {
  const day = hourlyWeather.hourlyWeather?.is_day;
  const code = hourlyWeather.hourlyWeather?.condition_code;
  return (
    <View style={styles.container}>
      <Text style={styles.hours}>
        {hourlyWeather.hourlyWeather?.time?.slice(11, 13)} giờ
      </Text>
      {day == 1 ? (
        code == 1000 ? (
          <Sun height={60} width={60} />
        ) : code == 1006 ||
          code == 1009 ||
          code == 1030 ||
          code == 1135 ||
          code == 1147 ||
          code == 1150 ||
          code == 1153 ||
          code == 1168 ||
          code == 1171 ? (
          <Cloud height={60} width={60} />
        ) : code == 1003 ? (
          <CloudAndSun height={60} width={60} />
        ) : code == 1072 ||
          code == 1087 ||
          code == 1189 ||
          code == 1192 ||
          code == 1195 ||
          code == 1198 ||
          code == 1201 ||
          code == 1237 ||
          code == 1243 ||
          code == 1246 ||
          code == 1249 ||
          code == 1252 ||
          code == 1261 ||
          code == 1264 ||
          code == 1276 ? (
          <CloudAndRain height={60} width={60} />
        ) : code == 1063 ||
          code == 1180 ||
          code == 1183 ||
          code == 1186 ||
          code == 1240 ||
          code == 1273 ? (
          <CloudAndRainAndSun height={60} width={60} />
        ) : code == 1066 ||
          code == 1269 ||
          code == 1114 ||
          code == 1117 ||
          code == 1204 ||
          code == 1207 ||
          code == 1210 ||
          code == 1213 ||
          code == 1216 ||
          code == 1219 ||
          code == 1222 ||
          code == 1225 ||
          code == 1255 ||
          code == 1258 ||
          code == 1279 ||
          code == 1282 ? (
          <CloudAndRain height={60} width={60} />
        ) : null
      ) : day == 0 ? (
        code == 1000 ? (
          <Moon height={60} width={60} />
        ) : code == 1006 ||
          code == 1009 ||
          code == 1030 ||
          code == 1135 ||
          code == 1147 ||
          code == 1150 ||
          code == 1153 ||
          code == 1168 ||
          code == 1171 ? (
          <BlackCloud height={60} width={60} />
        ) : code == 1003 ? (
          <CloudAndMoon height={60} width={60} />
        ) : code == 1072 ||
          code == 1087 ||
          code == 1189 ||
          code == 1192 ||
          code == 1195 ||
          code == 1198 ||
          code == 1201 ||
          code == 1237 ||
          code == 1243 ||
          code == 1246 ||
          code == 1249 ||
          code == 1252 ||
          code == 1261 ||
          code == 1264 ||
          code == 1276 ? (
          <BlackCloudAndRain height={60} width={60} />
        ) : code == 1063 ||
          code == 1180 ||
          code == 1183 ||
          code == 1186 ||
          code == 1240 ||
          code == 1273 ? (
          <CloudAndRainAndMoon height={60} width={60} />
        ) : code == 1066 ||
          code == 1069 ||
          code == 1114 ||
          code == 1117 ||
          code == 1204 ||
          code == 1207 ||
          code == 1210 ||
          code == 1214 ||
          code == 1216 ||
          code == 1219 ||
          code == 1222 ||
          code == 1225 ||
          code == 1255 ||
          code == 1258 ||
          code == 1279 ||
          code == 1282 ? (
          <BlackCloudAndRain height={60} width={60} />
        ) : null
      ) : null}
      {/*<Moon width={60} height={60} />*/}
      {/*<Image*/}
      {/*  source={require('https://cdn.weatherapi.com/weather/64x64/day/116.png')}*/}
      {/*  height={60}*/}
      {/*/>*/}
      <Text style={{color: Colors.white}}>
        {Math.round(hourlyWeather.hourlyWeather.temp_c)}°
      </Text>
    </View>
  );
}
export default HourlyWeatherButton;

const styles = StyleSheet.create({
  container: {
    height: 146,
    width: 64,
    borderRadius: 30,
    backgroundColor: 'rgba(167, 187, 232, 0.2)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'rgba(111, 88, 228, 0.7)',
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
