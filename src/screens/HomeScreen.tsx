import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React from 'react';
import HourlyWeatherButton from '../components/HourlyWeatherButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GetCurrentLocation from '../../services/getLocationService';
import GetLocationId from '../../services/getLocationId';
import GetLocationService from '../../services/getLocationService';
import {getCurrentPosition} from '@react-native-community/geolocation/lib/typescript/implementation';
import getLocationId from '../../services/getLocationId';
import getCurrentWeather from '../../services/getCurrentWeather';
import getLocationService from '../../services/getLocationService';
import GetCurrentWeather from '../../services/getCurrentWeather';
const TopTab = createMaterialTopTabNavigator();

function Hourly() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
function HomeScreen() {
  const currentCondition = GetLocationId();

  return (
    <ImageBackground source={require('../img/Background/home_background.png')}>
      <SafeAreaView style={styles.container}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', top: 100}}>
          <Text style={styles.locationText}>Cochabamba</Text>
          <Text style={styles.temperatureText}>19°</Text>
          <Text style={styles.skyText}>{currentCondition}</Text>
          <Text style={styles.lowHighTemp}>L:19° H:29°</Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 210,
          }}>
          <TopTab.Navigator>
            <TopTab.Screen name={'Hourly'} component={Hourly} />
            <TopTab.Screen name={'Weekly'} component={Weekly} />
          </TopTab.Navigator>
        </View>
      </SafeAreaView>
      {/* <HourlyWeatherButton /> */}
    </ImageBackground>
  );
}
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
