import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingStack from './OnboardingStack'
import BottomTabs from './BottomTabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LockScreen from '../LockScreen/LockScreen'
import * as SecureStore from "expo-secure-store"
import PasswordSetup from '../../src/Onboarding/PasswordSetup'

import WelcomeScreen from '../Onboarding/WelcomeScreen'
import SettingsScreen from '../Settings/SettingsScreen'
const Stack=createNativeStackNavigator();
const RootNavigation = () => {

    const [loading,setLoading]=useState(true);
    const [initialRoute,setInitialRoute]=useState(null)
    const resetApp=async()=>{
        await AsyncStorage.removeItem("ONBOARDING_COMPLETE")
        await SecureStore.deleteItemAsync("APP_PASSWORD")
        setInitialRoute("Onboarding")
        
    }
    
    
    useEffect(()=>{
        const CheckingOnboarding=async()=>{
        const done=await AsyncStorage.getItem("ONBOARDING_COMPLETE");
        const password=await SecureStore.getItemAsync("APP_PASSWORD");
        if(done!=="true"){
            setInitialRoute("Onboarding")

        }else if (password){
            setInitialRoute("Locked")

        }else{
            setInitialRoute("Unlock")
        }
        
        setLoading(false)
        
        
        }
        CheckingOnboarding();
    },[])
    if(loading) return (
        <View><Text>Loading....</Text></View>
    )
    


  return (
    <NavigationContainer key={initialRoute}>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={initialRoute}  >
            <Stack.Screen  name='Onboarding' component={OnboardingStack}/>
            <Stack.Screen  name='Unlock'>
                { ()=>(
                <BottomTabs resetApp={resetApp}/>
                )
                }
                </Stack.Screen>
            <Stack.Screen name='Locked' component={LockScreen}/>
            <Stack.Screen  name='PasswordSetup' component={PasswordSetup}/>
            <Stack.Screen component={WelcomeScreen} name='WelcomeScreen'/>
        </Stack.Navigator>
        
       

        
    </NavigationContainer>
  )
}

export default RootNavigation