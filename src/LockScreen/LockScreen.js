import { StyleSheet,Alert,View, Text ,TextInput,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticating } from '../Extra/Facelock'
import { BiometricsChk } from '../Extra/Facelock'
const LockScreen = ({route}) => {
    useEffect(()=>{
        const tryFaceLock=async()=>{
            if(route?.params?.mode==="forNewPassword"){return}
            const faceLockEnable=await AsyncStorage.getItem("FACELOCK")
            if(faceLockEnable==="true"){
                const DoItSupport=await BiometricsChk()
                if(!DoItSupport){
                    return
                }else{
                    const authenticate=await authenticating()
                    if(authenticate){
                        navigation.replace("Unlock")
                    }
                }
            }
        }
        tryFaceLock()
    },[])
     


    const navigation=useNavigation()
    
    
    const [input,setInput]=useState("");
    const chkPswrd=async(latestPassword)=>{
    const savedPin= await SecureStore.getItemAsync("APP_PASSWORD")
    
    if(latestPassword===savedPin){
        if(route?.params?.mode==="forNewPassword"){
            navigation.navigate("PasswordSetup",{mode:"fromSetting"})
        }else{
            navigation.replace("Unlock")
        }
        
         


        
    }else{
         
        setInput("")
        Alert.alert("Wrong Password")

    }
   
    
        

    
}
const Digits=[1,2,3,4,5,6,7,8,9,0]
const handlePress=(d)=>{
    
    const latestPassword=input+d
    if(input.length<=4){
    setInput(latestPassword)
     
    if(latestPassword.length===4){
        chkPswrd(latestPassword)
    }
}

}

  return (
    <SafeAreaView style={{alignItems:"center",flex:1,justifyContent:"center",backgroundColor:"#f0dbeb"}}>
        <Text style={styles.title}>Enter Password</Text>
        <View style={{flexDirection:"row"}}>
        {[0,1,2,3].map(i=>(
            <View key={i} style={[styles.dot,i<input.length&&styles.filledDot]}></View>
            ))}
            </View>
            <View style={styles.keypad}>
               { Digits.map((d)=>(
                <TouchableOpacity style={styles.key} key={d} onPress={()=>handlePress(d)} >
                    <Text style={styles.keysNumb}>{d}</Text>
                </TouchableOpacity>
               ))
               }
               
               

            </View>
                           <TouchableOpacity style={styles.del} onPress={()=>{setInput(p=>p.slice(0,-1))}}><Text style={styles.keysNumb}>Del</Text></TouchableOpacity>

                           

                           



    </SafeAreaView>

   
  )
}

export default LockScreen
const styles=StyleSheet.create({
    dot:{
        height:22,
        width:22,
        backgroundColor:"#ffffff",
        margin:7,
        borderRadius:30,
        marginTop:20,
        borderWidth:1

    },
    filledDot:{
        height:22,
        width:22,
        backgroundColor:"#df6adf",
        margin:7,
        borderRadius:30,
        marginTop:20,
        borderWidth:1

    },
    title:{
        fontSize:22,
        fontWeight:"bold",

    },
    keypad:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginTop:60,
        justifyContent:"center"

    },
    key:{
        backgroundColor:"#e075cc",
        width:"30%",
        padding:20,
        margin:5,
        alignItems:"center",
        borderRadius:100,
        opacity:0.8
       

    }    ,
    keysNumb:{
        fontSize:20,
        fontWeight:"bold"
    },
    del:{
        width:70,
        height:70,
        margin:5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#eda5ea",
        borderRadius:35

    }

})