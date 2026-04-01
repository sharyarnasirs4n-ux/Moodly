import { View, RootTagContext,Image,Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddEnteryScreen from '../Home/AddEnteryScreen';
import CalenderScreen from '../Home/CalenderScreen';
import HomeScreen from '../Home/HomeScreen';
import SettingsScreen from '../Settings/SettingsScreen';
import StatsScreen from '../Stats/StatsScreen';
import { BlurView } from 'expo-blur';
import diary1 from "../../assets/diary-3.png"
import diary2 from "../../assets/diary-2.png"
import calender1 from "../../assets/calendar-2.png"
import calender2 from "../../assets/calendar-3.png"
import plus1 from "../../assets/plus.png"
import plus2 from "../../assets/plus-2.png"
import analysis1 from "../../assets/analysing.png"
import analysis2 from "../../assets/analysing-2.png"
import setting1 from "../../assets/settings-3.png"
import setting2 from "../../assets/settings-4.png"



const Tab=createBottomTabNavigator();
export default function BottomTabs({resetApp,onChangePassword,setPasswordChangeRequest}) {

  const AnimatedTabIcon = ({ focused, image }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.3 : 1, 
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: focused ? 'rgba(248, 244, 248, 0.6)' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale }],
        
      }}
    >
      <Image source={image} style={{ width: 24, height: 24 }} />
    </Animated.View>
  );
};

  

  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarShowLabel:false,


      tabBarStyle:{
        position:"absolute",
        bottom:20,
        paddingBottom:0,
        height:60,
        marginHorizontal:20,
        justifyContent:"center",
        bottom:20,
        overflow:"hidden",
        
        
        
        borderRadius:50,
        
        backgroundColor:"transparent",
        


              },
              tabBarBackground:()=>(
                <BlurView
                intensity={40}
                tint="light"
                style={{flex:1}}
                
                />
              ),
              tabBarItemStyle:{
               
                
                width:50,
                height:50,
                marginHorizontal:10,
                alignItems:"center",
                justifyContent:"center",
                
                
                
                


                
              },
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: '#3C3C43',

             
    }} >
        <Tab.Screen 
        options={{
          tabBarIcon:({focused})=>{
            return <AnimatedTabIcon focused={focused} image={focused?diary1:diary2}/>
            
          }
        }}
        name='Home' component={HomeScreen} />
        <Tab.Screen
        options={{
          tabBarIcon:({focused})=>{
           return <AnimatedTabIcon focused={focused} image={focused?calender2:calender1}/>
          }
        }}
        name='Calender' component={CalenderScreen} />
        <Tab.Screen options={{
          tabBarIcon:({focused})=>{
            return <AnimatedTabIcon focused={focused} image={focused?plus1:plus2}/>
          }
        }} name='AddEntery' component={AddEnteryScreen}  />
        <Tab.Screen options={{
          tabBarIcon:({focused})=>{
            return <AnimatedTabIcon focused={focused} image={focused?analysis2:analysis1}/>
          }
          
          
        }} name='Stats' component={StatsScreen} />
        <Tab.Screen options={{
          tabBarIcon:({focused})=>{

      return <AnimatedTabIcon focused={focused} image={focused?setting1:setting2}/>
          }
        }} name='Setting' >
          {()=><SettingsScreen  resetApp={resetApp}   />}
        </Tab.Screen>
            

    </Tab.Navigator>
  )
}