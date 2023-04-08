import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {Moon} from '../img';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function HourlyWeatherButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.hours}>12 AM</Text>
      <Moon width={60} height={60} />
      <Text style={{color: Colors.grey}}>19°</Text>
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
    color: Colors.grey,
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    alignItems: 'center',
  },
});
