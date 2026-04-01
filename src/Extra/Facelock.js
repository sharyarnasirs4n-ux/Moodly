import * as LocalAuthentication from "expo-local-authentication"
import AsyncStorage from "@react-native-async-storage/async-storage"
export const BiometricsChk=async()=>{
    const doeshaveBio=await LocalAuthentication.hasHardwareAsync();
    const isSetorNot=await LocalAuthentication.isEnrolledAsync()
    return doeshaveBio && isSetorNot
}


export const  authenticating=async()=>{
    const result=await LocalAuthentication.authenticateAsync({
        promptMessage:"Unlock",
        
    disableDeviceFallback:false,

    })
    console.log(result)
    return result.success;

}