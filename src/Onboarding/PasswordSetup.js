import { View, Text,TouchableOpacity,StyleSheet,Alert } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { LinearGradient } from 'expo-linear-gradient'


const Digits=['1','2','3','4','5','6','7','8','9','0']

const PasswordSetup = ({navigation,route}) => {

    const [password,setPassword]=useState("")
    const [connfirmPassword,setConfirmPassword]=useState("")
    const [step,setStep]=useState(1);
    const handleClick=async(dgt)=>{
        if (step===1&&password.length<4){
            const newPassword=password+dgt;
            setPassword(newPassword)
        if((newPassword).length===4){
            setStep(2);
            
           } 
        }
        if(step===2 &&connfirmPassword.length<4){
            const newComfirmPassword=connfirmPassword+dgt;
            setConfirmPassword(newComfirmPassword);
            if(newComfirmPassword.length===4){
                if(newComfirmPassword===password){
                    await SecureStore.setItemAsync("APP_PASSWORD",password);
                    if(route?.params?.mode==="fromSetting"){
                        navigation.replace("Unlock",{screen:"SettingsScreen"})

                    }else{
                         navigation.navigate("WelcomeScreen");
                    }

                   

                }else{
                    Alert.alert("Password does not match");
                    setPassword("");
                    setConfirmPassword("");
                    setStep(1);
                }
            }
        }
        

    }
    const Dots=()=>{
        const length=step===1?password.length:connfirmPassword.length;
        return(
            <View style={styles.dots}>
                {
                    [0,1,2,3].map(i=>(
                        <View
                        key={i}
                        style={[styles.dot,
                            length>i&&styles.filledDot
                        ]}
                        />
                    ))
                }

            </View>
        )
        
    }
    const removeLast=()=>{
        if (step===1){
            setPassword(password.slice(0,-1));

        }else{
            setConfirmPassword(connfirmPassword.slice(0,-1));
        }
    }
    


  return (
    <LinearGradient colors={["#e0a8db","#f0dbeb"]} style={styles.container}>
        <Text style={styles.title}>
        {step===1?"Create a PIN":"Confirm Your PIN"}
        </Text>
        {Dots()}
        <View style={styles.keyboard}>
            {
                Digits.map(d=>(
                    <TouchableOpacity
                    key={d}
                    style={styles.key}
                    onPress={()=>handleClick(d)}
                    >
                        <Text style={styles.keynumb}>{d}</Text>

                    </TouchableOpacity>
                ))
            }
        </View>
        <TouchableOpacity
        
        onPress={removeLast}>
            <Text style={styles.del}>Delete</Text>
        </TouchableOpacity>

      
    </LinearGradient>
  )
}

export default PasswordSetup

const styles=StyleSheet.create({
    container:{
        flex:1,justifyContent:"center",padding:20,alignItems:"center"

    },
    title:{
        fontSize:22,
        textAlign:"center",
        marginBottom:20,
        fontWeight:"bold"
    },
    dots:{
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:30

    },
    dot:{
        
        width:18,
        height:18,
        borderRadius:9,
        margin:9,
        borderWidth:1
    },
    filledDot:{
        backgroundColor:"#e075cc"
    },
    keyboard:{
        flexDirection:"row",
        flexWrap:"wrap",
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

    },
    keynumb:{
        fontSize:23,
        fontWeight:"bold"
    },
    del:{
        textAlign:"center",
        marginTop:40,
        alignItems:"center",
        
        fontSize:20,
        padding:10,
        backgroundColor:"#e075cc",
        width:"50%",
        borderRadius:50
    }

})