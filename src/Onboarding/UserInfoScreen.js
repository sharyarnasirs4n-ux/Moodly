import { View, Text, Keyboard } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Image,TouchableOpacity , Alert,KeyboardAvoidingView,Platform } from 'react-native'
import { StyleSheet,TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import image from "../../assets/image.png"
import {Animated,ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Picker } from '@react-native-picker/picker'

const UserInfoScreen = ({navigation}) => {
   

const [name,setName]=useState("");

const handleContinue=async()=>{
    if (!name){
        Alert.alert("Please enter name")
        return;
    }
    try{
   
   await AsyncStorage.setItem("User_info",name)
   navigation.navigate("PasswordSetup")


}catch(e){
    console.log(e)
}
}



  return (

    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
         <LinearGradient colors={["#f1c3f0","#fee5fd"]} style={styles.container}
         start={{x:0,y:0}}
         end={{x:1,y:0}} 
    
    >
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS==="ios"?'padding':"height"}
            >

    
        <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20,justifyContent:"center"

         }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode='on-drag'
        >
            <Text style={styles.title}>Start Your Journal</Text>

        
      
      <TextInput style={styles.input}
      placeholder='Name'
      value={name}
      onChangeText={setName}
      
      
      />
      

      
      <TouchableOpacity onPress={handleContinue} style={styles.button} ><Text style={styles.text}>Continue</Text></TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    
    </SafeAreaView>
    </LinearGradient>
    
    </TouchableWithoutFeedback>
    
    
  )
}

export default UserInfoScreen

const styles=StyleSheet.create({
    container:{
        
        
        padding:20,
        flex:1,
        alignItems:"center",
        
    },
    input:{
        width:"100%",
        textAlign:"center",
        backgroundColor: "rgba(238, 87, 205, 0.74)",
        borderWidth:5,
        borderColor:"#ddd",
        padding:16,
        marginBottom:20,
        borderRadius:50,
        shadowColor:"#000",
        shadowOpacity:0.05,
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        fontSize:30,
        borderColor:"#f1e6f0",
        opacity:0.6
        
    },
    title:{
        fontSize:30,
        fontWeight:"bold",
        color:"#333",
        marginBottom:40,
        

    },
    button:{
        backgroundColor:"#e075cc",
        padding:20,
        borderRadius:12,
        alignItems:"center",
        marginTop:10,
    
    shadowOpacity: 0.3,
    
        
    },
    text: {
    
    fontSize: 18,
    fontWeight: 'bold',
  },
  

})