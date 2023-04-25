import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
import {color} from '@rneui/base';
import {SwipeListView} from 'react-native-swipe-list-view';
// import {SearchBar} from 'react-native-elements';

function RenderItem({item}) {
  const detail = GetSavedLocationDetail(item.item.lat, item.item.lon);

  return (
    <View style={{padding: 10}}>
      <ImageBackground
        source={require('../img/detailComponent/componentBackGround.png')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 378,
          height: 194,
          opacity: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            height: 120,
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: 'white',
              fontWeight: '400',
              fontSize: 60,
              paddingTop: 40,
              paddingLeft: 30,
            }}>
            {Math.round(detail?.avgTemp_c)}°
          </Text>
          <Image
            source={{
              uri: `https:${detail?.icon_link}`,
            }}
            style={{height: 140, width: 140, paddingLeft: 60}}
          />
        </View>
        <Text
          style={{
            color: 'rgba(235, 235, 245, 0.6)',
            fontWeight: '400',
            fontSize: 14,

            paddingLeft: 20,
          }}>
          Thấp nhất:
          {Math.round(detail?.minTemp_c)}° Cao nhất:
          {Math.round(detail?.maxTemp_c)}°
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              paddingLeft: 20,
              paddingTop: 10,
            }}>
            {detail?.name}, {detail?.region}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              paddingRight: 20,
              paddingTop: 10,
              fontWeight: 300,
            }}>
            {detail?.condition_text}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
function LocationScreen() {
  const [background, setBackground] = React.useState<string>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [cities, loading] = SearchForCities(searchText);
  const [isCitiesList, setIsCitiesList] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const [savedLocation, setSavedLocation] = React.useState<City[]>();
  console.log(isCitiesList);

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

  const deleteSavedLocation = async (name: string) => {
    let cities = await AsyncStorage.getItem('location');
    let arr = JSON.parse(cities!) == null ? [] : JSON.parse(cities!);

    try {
      arr.splice(
        arr.findIndex(e => e.name === name),
        1,
      );
      setSavedLocation(arr);
      Alert.alert(`Bạn đã xoá ${name} ra khỏi danh sách thành phố`);

      await AsyncStorage.setItem('location', JSON.stringify(arr));
    } catch (error) {
      // Error saving data
    }
  };

  // const getSavedLocationDetails = async () => {
  //   try {
  //     const arr = GetSavedLocationDetails(
  //       savedLocation[0].lat,
  //       savedLocation[0].lon,
  //     );
  //     console.log(arr);
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
  // useEffect(() => {
  //   console.log(savedLocation);
  //   retrieveData();
  //   getSavedLocation();
  //   console.log('hhh');
  //   // getSavedLocationDetails();
  // }, []);

  useEffect(() => {
    retrieveData();
    getSavedLocation();
  }, [isCitiesList, navigation]);

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Video
        source={background!}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={0.5}
        ignoreSilentSwitch={'obey'}
      />
      <SafeAreaView style={styles.container}>
        {/* <SearchBar
          platform="android"
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
          style={{width: '90%', paddingTop: 20}}
          onFocus={() => setIsCitiesList(true)}
          onCancel={() => console.log('nhan roi')}
          placeholder="Bấm vào đây để tìm thành phố"
          inputStyle={{alignItems: 'center'}}>
          {loading ? (
            <ActivityIndicator style={{marginRight: 10}} />
          ) : undefined}
        </SearchBar> */}
        {/* <SearchBar
          platform="android"
          placeholder="Type Here..."
          onChangeText={(text: string) => {
            setSearchText(text);
          }}
          style={{width: '90%', paddingTop: 20}}
          value={searchText}
          onFocus={() => setIsCitiesList(true)}
        /> */}
        <View
          style={{
            width: '90%',
            height: 50,
            backgroundColor: 'white',
            borderRadius: 18,
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={require('../img/detailComponent/loupe.png')}
            style={{width: 28, height: 28, marginLeft: 10}}
          />
          <TextInput
            value={searchText}
            style={{width: '76%'}}
            onChangeText={(text: string) => {
              setSearchText(text);
              setIsCitiesList(true);
            }}
            onFocus={() => setIsCitiesList(true)}
          />
          <TouchableOpacity
            onPress={() => {
              setIsCitiesList(false);
              setSearchText('');
            }}>
            <Image
              source={require('../img/detailComponent/close.png')}
              style={{width: 20, height: 20, marginRight: 16}}
            />
          </TouchableOpacity>
        </View>
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
            // <FlatList
            //   data={savedLocation}
            //   renderItem={object => <RenderItem item={object} />}
            // />
            <SwipeListView
              data={savedLocation}
              renderItem={object => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {
                      object,
                    });
                  }}>
                  <RenderItem item={object} />
                </TouchableOpacity>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View
                  style={{
                    backgroundColor: 'red',
                    height: 100,
                    width: 374,
                    marginTop: 100,
                    marginLeft: 12,
                    borderRadius: 18,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => deleteSavedLocation(data.item.name)}>
                    <Text
                      style={{
                        color: 'white',
                        paddingLeft: 20,
                        fontWeight: 500,
                      }}>
                      Xoá
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteSavedLocation(data.item.name)}>
                    <Text
                      style={{
                        color: 'white',
                        paddingRight: 20,
                        fontWeight: 500,
                      }}>
                      Xoá
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
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
