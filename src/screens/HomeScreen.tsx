import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import HourlyWeatherButton from '../components/HourlyWeatherButton';
import Humidity from '../components/Humidity';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import getCurrentWeather from '../../services/getCurrentWeather';

import GetForecastDay from '../../services/getForecastDay';
import HourlyWeather from '../../model/HourlyWeather';
import GetFutureWeather from '../../services/getFutureWeather';
import ForecastDay from '../../model/ForecastDay';

const TopTab = createMaterialTopTabNavigator();

function Hourly(hourlyWeather: HourlyWeather[]) {
  const time = parseInt(hourlyWeather[1].slice(11, 13));

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: 8}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {hourlyWeather[0].map(a =>
          a.time.slice(11, 13) > time ? (
            <HourlyWeatherButton
              // time={a.time}
              // temp_c={a.temp_c}
              // condition_code={a.condition_code}
              hourlyWeather={a}
              key={parseInt(a.time.slice(11, 13))}
              isHourlyButton={true}
            />
          ) : null,
        )}
      </View>
    </ScrollView>
  );
}
function Weekly(dayForecast: ForecastDay[]) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingLeft: 8}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {dayForecast[0].map(a => (
          <HourlyWeatherButton
            // time={a.time}
            // temp_c={a.temp_c}
            // condition_code={a.condition_code}
            hourlyWeather={a}
            key={parseInt(a.date.slice(8, 10))}
            isHourlyButton={false}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function HomeScreen(this: any) {
  const currentCondition = getCurrentWeather();
  const [forecastDay, hourlyForecast] = GetForecastDay();
  const [backGround, setBackGround] = React.useState<number>();
  const code = currentCondition?.condition_code;
  const day = currentCondition?.is_day;
  const clear_day = [1000, 1003];
  const clear_night = [1000];
  const rainy_day = [
    1072, 1087, 1189, 1192, 1195, 1198, 1201, 1237, 1243, 1246, 1249, 1252,
    1261, 1264, 1276, 1063, 1180, 1183, 1186, 1240, 1273, 1066, 1069, 1114,
    1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279,
    1282,
  ];
  const cloudy_day = [1006, 1009, 1030, 1135, 1147, 1150, 1153, 1168, 1171];
  const cloudy_night = [
    1006, 1009, 1030, 1135, 1147, 1150, 1153, 1168, 1171, 1003,
  ];
  const rainy_night = [
    1072, 1087, 1189, 1192, 1195, 1198, 1201, 1237, 1243, 1246, 1249, 1252,
    1261, 1264, 1276, 1063, 1180, 1183, 1186, 1240, 1273, 1066, 1069, 1114,
    1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279,
    1282,
  ];

  useEffect(() => {
    if (code != null) {
      if (day == 1) {
        if (clear_day.includes(code)) {
          setBackGround(require('../img/Background/clear_day.jpg'));
        } else if (cloudy_day.includes(code)) {
          setBackGround(require('../img/Background/cloudy_day.jpg'));
        } else if (rainy_day.includes(code)) {
          setBackGround(require('../img/Background/rainy_day.jpg'));
        }
      } else if (day == 0) {
        if (clear_night.includes(code)) {
          setBackGround(require('../img/Background/clear_night.jpg'));
        } else if (cloudy_night.includes(code)) {
          setBackGround(require('../img/Background/cloudy_night.jpg'));
        } else if (rainy_night.includes(code)) {
          setBackGround(require('../img/Background/rainy_night.jpg'));
        }
      }
    } else {
      setBackGround(require('../img/Background/home_background.png'));
    }
  }, [
    clear_day,
    clear_night,
    cloudy_day,
    cloudy_night,
    code,
    day,
    rainy_day,
    rainy_night,
  ]);
  // console.log(typeof require('../img/Background/rainy_night.jpg'));
  // console.log(hourlyForecast);
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore

  return (
    <ImageBackground source={backGround!}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginTop: 20}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.locationText}>{currentCondition?.name}</Text>
            <Text style={styles.temperatureText}>
              {currentCondition?.temp_c}°
            </Text>
            <Text style={styles.skyText}>
              {currentCondition?.condition_text}
            </Text>
            <Text style={styles.lowHighTemp}>
              Thấp nhất:
              {Math.round(forecastDay ? forecastDay[0].minTemp_c : null)}° Cao
              nhất:
              {Math.round(forecastDay ? forecastDay[0].maxTemp_c : null)}°
            </Text>
            <View style={{marginTop: 7}}>
              <View style={{flexDirection: 'row', alignContent: 'center'}}>
                {/*<Humidity width={25} height={25} />*/}
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 212,
            }}>
            <TopTab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: 'transparent',
                },
                tabBarShowLabel: false,
              }}
              sceneContainerStyle={{backgroundColor: 'transparent'}}>
              <TopTab.Screen
                name={'Hourly'}
                // component={() =>
                //   currentCondition != undefined ? (
                //     <Hourly time={currentCondition!.time} />
                //   ) : null
                // }
                options={{
                  tabBarIcon: ({focused}) => (
                    <Text
                      style={{
                        fontWeight: focused ? '600' : '300',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Theo giờ
                    </Text>
                  ),
                  tabBarIconStyle: {
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'center',
                  },
                }}>
                {props =>
                  hourlyForecast != undefined ? (
                    <Hourly
                      // time={currentCondition?.time}
                      {...[hourlyForecast, currentCondition?.time]}
                      // time={currentCondition?.time}
                    />
                  ) : null
                }
              </TopTab.Screen>
              <TopTab.Screen
                name={'Weekly'}
                options={{
                  tabBarIcon: ({focused}) => (
                    <Text
                      style={{
                        fontWeight: focused ? '600' : '300',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Theo tuần
                    </Text>
                  ),
                  tabBarIconStyle: {
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'center',
                  },
                }}>
                {props =>
                  forecastDay != undefined ? (
                    <Weekly
                      // time={currentCondition?.time}
                      {...[forecastDay]}
                      // time={currentCondition?.time}
                    />
                  ) : null
                }
              </TopTab.Screen>
            </TopTab.Navigator>
          </View>
          <View style={{marginTop: 10, marginLeft: 12, marginBottom: 12}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 16,
                color: 'white',
              }}>
              Thông tin chi tiết
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Humidity />
            <Humidity />
            <Humidity />
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <HourlyWeatherButton /> */}
    </ImageBackground>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  locationText: {
    color: '#FFFF',
    fontWeight: '400',
    fontSize: 24,
  },
  temperatureText: {
    color: '#FFFF',
    fontWeight: '300',
    fontSize: 60,
  },
  skyText: {
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  lowHighTemp: {
    color: '#FFFF',
    fontWeight: '400',
    fontSize: 15,
  },
});
