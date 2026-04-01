import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import OnboardingStack from "./src/Navigation/OnboardingStack"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootNavigation from './src/Navigation/RootNavigation'
import { initDB } from './src/Database/database'
const App = () => {
  useEffect(()=>{
    initDB();
  },[])
  return (

    <GestureHandlerRootView style={{flex:1,backgroundColor:"white"}}>
    <RootNavigation/>
    </GestureHandlerRootView>
  )
}

export default App