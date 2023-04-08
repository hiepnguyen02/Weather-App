import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  PanResponder,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import HourlyWeatherButton from '../components/HourlyWeatherButton';
import Humidity from '../components/Humidity';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RBSheet from 'react-native-raw-bottom-sheet';
import getCurrentWeather from '../../services/getCurrentWeather';

import GetForecastDay from '../../services/getForecastDay';
import BottomDrawer from 'react-native-bottom-drawer-view';
import {HumidityIcon, Moon} from '../img';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const TopTab = createMaterialTopTabNavigator();

function Hourly() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
    </View>
  );
}
function Weekly() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}>
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
      <HourlyWeatherButton />
    </View>
  );
}

function HomeScreen(this: any) {
  const currentCondition = getCurrentWeather();
  const forecastDay = GetForecastDay();

  return (
    <ImageBackground
      source={require('../img/Background/home_day_background.png')}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
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
              Thấp nhất:{forecastDay?.minTemp_c}° Cao nhất:
              {forecastDay?.maxTemp_c}°
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
                component={Hourly}
                options={{
                  tabBarIcon: ({focused}) => (
                    <Text
                      style={{
                        fontWeight: focused ? '600' : '300',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Hourly Forecast
                    </Text>
                  ),
                  tabBarIconStyle: {
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'center',
                  },
                }}
              />
              <TopTab.Screen
                name={'Weekly'}
                component={Weekly}
                options={{
                  tabBarIcon: ({focused}) => (
                    <Text
                      style={{
                        fontWeight: focused ? '600' : '300',
                        fontSize: 16,
                        color: 'white',
                      }}>
                      Weekly Forecast
                    </Text>
                  ),
                  tabBarIconStyle: {
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'center',
                  },
                }}
              />
            </TopTab.Navigator>
          </View>
          <Humidity />
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
