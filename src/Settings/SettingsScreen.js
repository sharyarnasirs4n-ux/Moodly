import { View, Text,TouchableOpacity,StyleSheet,Modal,TextInput, Alert ,Switch} from 'react-native'
import { BlurView } from 'expo-blur'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from "expo-secure-store"
import { deleteEntriesAll,getEntries,insertEntry } from '../Database/database'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LockScreen from '../LockScreen/LockScreen'
import { useNavigation } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system/legacy';
import * as  Sharing from "expo-sharing"
import * as DocumetPicker from "expo-document-picker"
const SettingsScreen = ({resetApp}) => {

    useEffect(()=>{
        const LoadingsavedValueForFaceLock=async()=>{
        const savedValueForFaceLock =await AsyncStorage.getItem("FACELOCK")
        if(savedValueForFaceLock){
            setEnableFaceLock(JSON.parse(savedValueForFaceLock))

        }
        }
        LoadingsavedValueForFaceLock()
    },[])


    const [nameChangeVisible,setNameChangeVisible]=useState(false)
    const navigation=useNavigation()
    const onChangePassword=()=>{
        navigation.navigate("Locked",{
            mode:"forNewPassword"
        })
    }

   

    const [name,setName]=useState("")
    const [EnableFaceLock,setEnableFaceLock]=useState(false)
    useEffect(()=>{
        const getName=async()=>{
            const userName=await AsyncStorage.getItem("User_info");
            if(userName){setName(userName)};

        }
        getName()
    },[])
    
    
    const changeName=async()=>{
        if(name.trim()===""){
            Alert.alert("Please Enter a Right Name")
            return
        }else{
            await AsyncStorage.setItem("User_info",name)
            
            setNameChangeVisible(false)
        }
        
    }
    
   const backup = async () => {
  try {
    const data = getEntries();
    const fileUri = FileSystem.documentDirectory + "backup.json";

    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));

    const canBeShare = await Sharing.isAvailableAsync();
    if (canBeShare) {
      await Sharing.shareAsync(fileUri, {
        dialogTitle: "Save your backup (Choose iCloud Drive)",
        mimeType: "application/json",
      });
    }

  } catch (e) {
    console.log(e);
    Alert.alert("Error", "Failed to create backup");
  }
};

const getBackUpDataBack = async () => {
  try {
    const result = await DocumetPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.type === "cancel") return;

    const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
    const data = JSON.parse(content);

    data.forEach((entry) => insertEntry(entry));

    Alert.alert("Success", "Backup restored!");
  } catch (e) {
    console.log(e);
    Alert.alert("Error", "Failed to restore backup");
  }
};
    
  return (
    
    <ScrollView contentContainerStyle={{flex:1,
        padding:20,
        backgroundColor:"#fee5fd",
        alignItems:"center",
        gap:50



    }}>
        <SafeAreaView>
        <Text style={styles.nameHeading}>Hi! {name}</Text>
        
        <View style={{alignItems:"center",gap:20}}>
            <Text style={styles.headtitle}>PERSONAL</Text>
            <TouchableOpacity onPress={()=>setNameChangeVisible(true)} style={styles.values}><Text style={styles.text}>Change Your Name</Text></TouchableOpacity>
            <Modal animationType="fade"  transparent={true}   visible={nameChangeVisible} >
                <View style={styles.containerForModal}>
                    <BlurView intensity={80} style={StyleSheet.absoluteFill} />
                <View style={styles.nameBox}>
                    <Text style={{fontSize:20,margin:10,fontWeight:"bold"}}>Enter New Name</Text>

                    <TextInput value={name} onChangeText={(a)=>setName(a)}  placeholder="enter name" style={styles.inputForNewName}/>
                     <View style={{flexDirection:"row" , gap:20,margin:20}}>
                    <TouchableOpacity onPress={changeName}  style={styles.button1}><Text style={{fontSize:18}}>Done</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setNameChangeVisible(false)}} style={styles.button2}><Text style={{fontSize:18}}>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
           
            <TouchableOpacity onPress={onChangePassword}  style={styles.values}><Text style={styles.text}>Change Password</Text></TouchableOpacity>
            <View style={styles.facelock}>
            <Text style={styles.facelocktext}>Face Lock</Text><Switch
            value={EnableFaceLock}
            onValueChange={async(p)=>{
                setEnableFaceLock(p)
                await AsyncStorage.setItem("FACELOCK",JSON.stringify(p))
                
            }}
            />
        </View>

        </View>
       
        <View style={{alignItems:"center" ,margin:30,gap:20}}><Text style={styles.headtitle}>Data Backup</Text>
        <TouchableOpacity style={styles.values} onPress={backup}><Text style={styles.text}>Backup Data</Text></TouchableOpacity>
        <TouchableOpacity onPress={getBackUpDataBack} style={styles.values}><Text style={styles.text}>Get Backup Data</Text></TouchableOpacity>
        </View>
        
        
        
        </SafeAreaView>

      
    </ScrollView>
    
  )
}

export default SettingsScreen

const styles=StyleSheet.create({
    headtitle:{
        color:"#31172a",
        fontSize:23
        ,
        fontWeight:"bold"
    },
    text:{
        fontSize:18,
        
    },
    values:{
        borderRadius:25,
        width:200,
        alignItems:"center",
       
        padding:15,
        
        backgroundColor:"#e075cc"

    },
    nameBox:{
        alignItems:"center",
    borderRadius:20,
    
    backgroundColor:"#fee5fd",
    padding:25,
    width:"70%"
    },
    button1:{
        borderRadius:20,
        
        padding:15,
        backgroundColor:"#e075cc"
        
    },
    button2:{
        borderRadius:20,
        
        padding:15,
        backgroundColor:"#f23f3f"
        
    },
    containerForModal:{
        flex:1,
        alignItems:"center",
        
        
        justifyContent:"center"
    },
    inputForNewName:{
        padding:20,
        borderRadius:10,
        borderWidth:1,
        fontSize:18,
        width:"90%",
        alignSelf:"center"

    },
    nameHeading:{
        fontSize:22,
        fontWeight:"bold",
        marginBottom:50,
        alignSelf:"center"
    },
    facelock:{
        flexDirection:"row",
         borderRadius:25,
        width:200,
        alignItems:"center",
       
        padding:15,
        
        backgroundColor:"#e075cc",
       gap:35

    },
    facelocktext:{
        fontSize:18,
        

    }



})