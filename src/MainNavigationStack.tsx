import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native'
import { 
    NavigationContainer
  } from '@react-navigation/native';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RFValue } from 'react-native-responsive-fontsize';
import { FONT_DEFAULT_HEIGHT } from "./Constants/Constants";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutPage, CurrencyPage } from './Page'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#6B9962',
      inactiveTintColor: '#666',
      labelStyle: labelStyle
    }}
    >
      <Tab.Screen name="О приложении" 
            component={ AboutPage } 
            options={{
              tabBarLabel: 'О приложении',
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Image 
                          source={require('./assets/icons/info.png')}
                          style={{...imageStyle, tintColor: color}}
                          />
                )
              }
            }}
            />
      <Tab.Screen name="Котировки" 
            component={ CurrencyPage } 
            options={{
              tabBarLabel: 'Котировки',
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <Image 
                          source={require('./assets/icons/chart.png')}
                          style={{...imageStyle, tintColor: color}}
                          />
                )
              }
            }}
            />
    </Tab.Navigator>
  );
}

const MainNavigationStack = (props: any) => (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
)


const styles = StyleSheet.create({
  imageStyle: {
    ...Platform.select({
      ios: {
        width: wp(6),
        height: wp(6)
      },
      android: {
        width: wp(7),
        height: wp(7)
      }
    })
  },
  labelStyle: {
    ...Platform.select({
      ios:{
        fontSize: RFValue(6.5, FONT_DEFAULT_HEIGHT)
      },
      android: {
        fontSize: RFValue(5.5, FONT_DEFAULT_HEIGHT)
      }
    })
  }
})

const { imageStyle, labelStyle } = styles

export {MainNavigationStack}