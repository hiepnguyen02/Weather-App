import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import HourlyWeatherButton from '../components/HourlyWeatherButton';
import Video from 'react-native-video';
function SettingsScreen() {
  return (
    /*<ImageBackground
      source={require('../img/Background/home_background.png')}
      style={styles.container}>
      <Text style={styles.locationText}>Cochabamba</Text>
      <Text style={styles.temperatureText}>19°</Text>
      <Text style={styles.skyText}>Mostly Clear</Text>
      <Text style={styles.lowHighTemp}>L:19° H:29°</Text>
      /*{ <HourlyWeatherButton /> }*/
    //</ImageBackground>
    <View style={styles.container}>
          <Video
            source={require("../img/Background/snowy_day.mp4")}
            style={styles.backgroundVideo}
            muted={true}
            repeat={true}
            resizeMode={"cover"}
            rate={0.5}
            ignoreSilentSwitch={"obey"}
          />
          <Text style={styles.locationText}>Cochabamba</Text>
          <Text style={styles.temperatureText}>19°</Text>
          <Text style={styles.skyText}>Mostly Clear</Text>
          <Text style={styles.lowHighTemp}>L:19° H:29°</Text>
        </View>
  );
}
export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      alignItems: "stretch",
      bottom: 0,
      right: 0
    },
});
