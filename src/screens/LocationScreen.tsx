import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';

import React, {useCallback, useEffect} from 'react';
import SearchBar from 'react-native-platform-searchbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SearchForCities from '../../services/searchForCities';
import City from '../../model/City';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function LocationScreen() {
  const [background, setBackground] = React.useState<string>();
  const [searchText, setSearchText] = React.useState<string>('');
  const [cities, loading] = SearchForCities(searchText);
  const [isCitiesList, setIsCitiesList] = React.useState<boolean>(false);
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const navigation = useNavigation();
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
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <ImageBackground source={parseInt(background!)}>
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
          ) : null}
        </View>
      </SafeAreaView>
    </ImageBackground>
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
  },
});
