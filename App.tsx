/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './src/screens/SettingsScreen';
import LocationScreen from './src/screens/LocationScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from './src/screens/DetailScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function DetailStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'List'}>
      <HomeStack.Screen name="List" component={LocationScreen} />
      <HomeStack.Screen name="Details" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    //   <SafeAreaView style={backgroundStyle}>
    //     <StatusBar
    //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //       backgroundColor={backgroundStyle.backgroundColor}
    //     />
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={backgroundStyle}>
    //       <Header />
    //       <View
    //         style={{
    //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //         }}>
    //         <Section title="Step One">
    //           Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //           screen and then come back to see your editssss.
    //         </Section>
    //         <Section title="See Your Changes">
    //           <ReloadInstructions />
    //         </Section>
    //         <Section title="Debug">
    //           <DebugInstructions />
    //         </Section>
    //         <Section title="Learn More">
    //           Read the docs to discover what to do next:
    //         </Section>
    //         <LearnMoreLinks />
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // );

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            opacity: 0.7,

            height: 90,
            ...styles.bottomBar,
          },
        }}
        initialRouteName={'Home'}>
        <Tab.Screen
          name="Location Screen"
          component={DetailStackScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/locationPressed.png')
                      : require('./src/img/bottomIcon/location.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Vị trí
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/pressedHome.png')
                      : require('./src/img/bottomIcon/NonPressedHome.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Thời tiết
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/settingPressed.png')
                      : require('./src/img/bottomIcon/setting.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Cài đặt
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
const styles = StyleSheet.create({
  bottomBar: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default App;
