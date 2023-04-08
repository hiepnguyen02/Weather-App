import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {Moon} from '../img';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function Humidity() {
  return (
    <View style={styles.container}>
      <Text style={styles.hours}>12 AM</Text>
      <Moon width={60} height={60} />
      <Text style={{color: Colors.white}}>19°</Text>
    </View>
  );
}
export default Humidity;

const styles = StyleSheet.create({
  container: {
    height: 146,
    width: 64,
    borderRadius: 30,
    backgroundColor: 'rgba(111, 88, 228, 1)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
