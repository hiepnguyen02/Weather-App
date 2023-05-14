import React, { useEffect, useState } from 'react';
import { View, Switch, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Video from 'react-native-video';
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';

const sections = [
  {
    header: 'Giao diện',
    items: [
      {id: 'language', icon: 'globe', label: 'Ngôn ngữ', type: 'select', displayLeft: '', displayRight: ''},
      {id: 'notification', icon: 'bell', label: 'Thông báo', type: 'toggle', displayLeft: '', displayRight: ''},
      {id: 'tempuratureUnit', icon: 'thermometer', label: 'Nhiệt độ', type: 'toggle', displayLeft: '°F', displayRight: '°C'},
      {id: 'speedUnit', icon: 'chevrons-right', label: 'Vận tốc', type: 'toggle', displayLeft: 'mph', displayRight: 'kph'},
      
    ],
  },
  {
    header: 'Trợ giúp',
    items: [
      {id: 'contact', icon: 'mail', label: 'Liên hệ', type: 'link'},
    ]
  }
];
export default function SettingsScreen() {
  const [background, setBackground] = React.useState<number>();
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('background');
        if (value !== null) {
          setBackground(parseInt(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    retrieveData();
  },[]);

  const [form, setForm] = useState({
    language: 'Tiếng Việt',
    tempuratureUnit: true,
    speedUnit: true,
    notification: true,
  })
  console.log(sections)
  return (
    <View style={styles.background}>
      <Video
        source={background}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={0.5}
        ignoreSilentSwitch={'obey'}
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Cài đặt</Text>
            <Text style={styles.subtitle}>Lựa chọn cài đặt theo ý muốn</Text>
          </View>
          {sections.map(({header, items}) => (
            <View style={styles.section} key={header}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{header}</Text> 
              </View>
              <View style={styles.sectionBody}>
                {items.map(({label, id, type, icon, displayLeft, displayRight }) => (
                  <View style={styles.rowWrapper} key={id}>
                    
                      <View style={styles.row}>
                        <FeatherIcon
                        name={icon}
                        color='#616161'
                        size={22}
                        style={{ marginRight: 12}}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer}/>

                        {type === 'select' && (
                          <TouchableOpacity>
                            <Text style={styles.rowValue}>{form[id]}</Text>
                            
                          </TouchableOpacity>
                        )}

                        {type === 'toggle' && (
                          <TouchableOpacity>
                            <View style={styles.switch}>
                              <Text style={styles.rowValue}>{displayLeft}</Text>
                              <Switch
                              value={form[id]}
                              onValueChange={value =>
                                setForm({ ...form, [id]: value})
                              }
                              />
                              <Text style={styles.rowValue}>{displayRight}</Text>
                            </View>
                          </TouchableOpacity>
                        )}

                        {type === 'link' && (
                          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
                            <FeatherIcon 
                            name='chevron-right' 
                            color='#ababab' 
                            size={22}
                            />
                          </TouchableOpacity>
                        )}

                      </View>
                    
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
export default SettingsScreen;
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container: {
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
    paddingVertical: 6,
    marginHorizontal: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginHorizontal: 6,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1d1d',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    marginTop: 12,
  },
  rowWrapper: {
    paddingHorizontal: 12,
    borderTopWidth: 0,
    borderColor: '#e3e3e3',
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginVertical: 6,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flex: 1,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#616161',
    marginRight: 4,
  },
  switch: {
    flexDirection: 'row',
  },
});
