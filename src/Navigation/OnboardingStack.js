import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserInfoScreen from "../Onboarding/UserInfoScreen"
import WelcomeScreen from "../Onboarding/WelcomeScreen"
import ChooseAcitivities from '../Onboarding/ChooseAcitivities'
import PasswordSetup from '../Onboarding/PasswordSetup'

const Stack=createNativeStackNavigator();
const OnboardingStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}}   name='UserInfoScreen' component={UserInfoScreen} />
        <Stack.Screen options={{headerShown:false}}  name="WelcomeScreen" component={WelcomeScreen} />

          
        <Stack.Screen name='ChooseActivities' component={ChooseAcitivities}/>
        <Stack.Screen name="PasswordSetup" component={PasswordSetup}/>


    </Stack.Navigator>
  )
}

export default OnboardingStack