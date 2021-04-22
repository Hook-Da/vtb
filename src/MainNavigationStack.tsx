import React from 'react'
import { 
    NavigationContainer, 
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
  } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutPage, CurrencyPage } from './Page'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="О приложении" component={AboutPage} />
      <Tab.Screen name="Котировки" component={CurrencyPage} />
    </Tab.Navigator>
  );
}

const MainNavigationStack = (props: any) => (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
)

export {MainNavigationStack}