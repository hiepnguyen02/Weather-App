import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import React, {useCallback, useEffect, useMemo} from 'react';
import SearchBar from 'react-native-platform-searchbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchForCities from '../../services/searchForCities';
import City from '../../model/City';
import {useNavigation} from '@react-navigation/native';
import GetSavedLocationDetail from '../../services/getSavedLocationDetail';

function LocationScreen() {
  const [background, setBackground] = React.useState<string>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [cities, loading] = SearchForCities(searchText);
  const [isCitiesList, setIsCitiesList] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const [savedLocation, setSavedLocation] = React.useState<City[]>();
  // const savedLocationDetails = savedLocation?.map(a => {
  //   GetSavedLocation(a.lat, a.lon);
  // });
  // console.log(savedLocationDetails);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('background');
      if (value !== null) {
        setBackground(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  const getSavedLocation = async () => {
    try {
      const value = await AsyncStorage.getItem('location');
      if (value !== null) {
        let arr = JSON.parse(value);
        setSavedLocation(arr);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const getSavedLocationDetails = async () => {
    try {
      savedLocation?.map(a => {
        console.log(GetSavedLocationDetail(a.lat, a.lon));
      });
    } catch (error) {
      // Error retrieving data
    }
  };
  // useEffect(() => {
  //   console.log(savedLocation);
  //   retrieveData();
  //   getSavedLocation();
  //   console.log('hhh');
  //   // getSavedLocationDetails();
  // }, []);
  useEffect(() => {
    console.log(savedLocation);
    retrieveData();
    getSavedLocation();
    console.log('hhh');
  }, []);
  console.log('jsjsj');
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Video
        source={background}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={0.5}
        ignoreSilentSwitch={'obey'}
      />
      <SafeAreaView style={styles.container}>
        <SearchBar
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          style={{width: '90%', paddingTop: 20}}
          onFocus={() => setIsCitiesList(true)}
          onCancel={() => setIsCitiesList(false)}
          placeholder="Bấm vào đây để tìm thành phố"
          inputStyle={{alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator style={{marginRight: 10}} />
          ) : undefined}
        </SearchBar>
        <View style={{backgroundColor: 'transparent', marginTop: 20}}>
          {isCitiesList ? (
            <FlatList
              data={cities}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {
                      item,
                    });
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 18,
                      height: 44,
                      color: Colors.white,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatList
              data={savedLocation}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {
                      item,
                    });
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 18,
                      height: 44,
                      color: Colors.white,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
export default LocationScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});
