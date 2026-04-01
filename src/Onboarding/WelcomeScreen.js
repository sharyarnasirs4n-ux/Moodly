import { View, Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import heart from "../../assets/heart.png"
import fire from "../../assets/fire.png"
import cross from "../../assets/close.png"

const moods=[
  { type: 'awesome', bg: '#FFD700' },    
  { type: 'good', bg: '#4FC3F7' },       
  { type: 'loved', bg: '#F48FB1' },      
  { type: 'meh', bg: '#FFB74D' },        
  { type: 'bad', bg: '#FF7043' },        
  { type: 'awful', bg: '#ce4a4a' },      
  { type: 'angry', bg: "#B71C1C" }
]


const WelcomeScreen = ({navigation,route}) => {
  const [user,setuser]=useState("")
  const MainScreenRendering=async()=>{
    await AsyncStorage.setItem("ONBOARDING_COMPLETE","true");
    
      
      navigation.replace("Unlock");
    
  
   
  
  }

  const getName=async()=>{
  try{
    const user_name= await AsyncStorage.getItem("User_info");

    if(user_name!==null){
      setuser(user_name)

    }
   


  }catch(e){console.log(e)}
  }
  
  const [currentMoodIndex,setCurrentMoodIndex]=useState(0);
  useEffect(()=>{
    getName();
    const interval=setInterval(()=>{
      setCurrentMoodIndex((p)=>(p+1)%moods.length);

    },1500);
    return ()=>clearInterval(interval);
  },[]);

  const mood=moods[currentMoodIndex];

  const renderFace=()=>{
    switch (mood.type){
      case "awesome":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.awesomeEye}></View>
            <View style={styles.awesomeEye} ></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.awesomeMouth}></View>
          </View>


        </View>);
      case "good":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.goodEye}></View>
            <View style={styles.goodEye} ></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.goodMouth}></View>
          </View>


        </View>);
      case "loved":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.lovedEye}><Image style={{width:35, resizeMode:"contain"}} source={heart}/></View>
            <View style={styles.lovedEye} ><Image style={{width:35, resizeMode:"contain"}}  source={heart}/></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.lovedMouth}></View>
          </View>


        </View>)
      case "meh":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.mehEye}></View>
            <View style={styles.mehEye} ></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.mehMouth}></View>
          </View>


        </View>)
      case "bad":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.badEyeOne}></View>
            <View style={styles.badEyeTwo} ></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.badMouth}></View>
          </View>


        </View>)
      case "awful":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.awfulEye}></View>
            <View style={styles.awfulEye} ></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.awfulMouth}></View>
          </View>


        </View>)
      case "angry":
        return (<View style={styles.faceBox}>
          <View style={styles.eyesBox}>
            <View style={styles.angryEye}><Image style={{width:35 ,resizeMode:"contain"}}  source={fire}/></View>
            <View style={styles.angryEye} ><Image style={{width:35 ,resizeMode:"contain"}}  source={fire}/></View>
          </View>
          <View style={styles.mouthBox}>
          <View style={styles.angryMouth}></View>
          </View>


        </View>)
        default:
          return null;          
    }
  }
  
  return (
    
    <View style={[styles.container,{backgroundColor:mood.bg}]}>
      <Text style={styles.greeting}>Hello {user} !</Text>

      
      {renderFace()}
      
      <TouchableOpacity style={styles.button} onPress={MainScreenRendering}>
        <Text style={styles.text}>Start Your Journay</Text>

      </TouchableOpacity>
    </View>
    
  )
}

export default WelcomeScreen
const styles=StyleSheet.create({
  container:{
    flex:1,
   alignItems:"center",
   justifyContent:"space-evenly"

  },
  faceBox:{
    alignItems:"center",
    justifyContent:"center",
    margin:60,
    backgroundColor: "#FFF",   
  borderRadius: 100 ,
  opacity:0.8,
   
    width:200,
    height:200

  },
  eyesBox:{
    width:"100%",
    height:"40%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    

    
  }
  ,
  mouthBox:{
    
    height:"50%",
    width:"100%",
    
    alignItems: "center",
  justifyContent: "flex-start"
  },
  awesomeEye:{
    
    
    width:35,
    height:35,
    backgroundColor:"#000",
    
    marginHorizontal: 10,
    borderRadius:50
  },
  awesomeMouth:{
    backgroundColor:"#000",
    width:80,
    height:40,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  goodEye:{
    backgroundColor:"#000",
    width:40,
    height:20,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    marginHorizontal:10,

    
  },
  goodMouth:{
    backgroundColor:"#000",
    width:80,
    height:40,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  lovedEye:{
    marginHorizontal:10
    
  },
  lovedMouth:{

    backgroundColor:"#f34a4a",
    width:60,
    height:30,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  mehEye:{
    width:35,
    height:35,
    backgroundColor:"#000",
    
    marginHorizontal: 10,
    borderRadius:50

  },
  mehMouth:{
    backgroundColor:"#000",
    width:60,
    height:10,
    borderRadius:30




  },
  badEyeOne:{
    backgroundColor:"#000",
    width: 36,
  height: 18,
  backgroundColor: "#000",
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
  marginHorizontal: 8,


  },
  badEyeTwo:{
    backgroundColor:"#000",
    width: 30,
  height: 30,
  backgroundColor: "#000",
  borderRadius: 15,
  marginHorizontal: 8,

    
    

  },
  badMouth:{
    backgroundColor:"#000",
    width:80,
    height:40,
    borderTopLeftRadius:50,
    borderTopRightRadius:50

  },
  awfulEye:{
    backgroundColor:"#000",
    width:40,
    height:20,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    marginHorizontal:10,

  },
  awfulMouth:{
     backgroundColor:"#000",
    width:80,
    height:40,
    borderTopLeftRadius:50,
    borderTopRightRadius:50

  },
  angryEye:{
    marginHorizontal:5

  },
  angryMouth:{
  backgroundColor:"#000",
    width:80,
    height:40,
    borderTopLeftRadius:50,
    borderTopRightRadius:50
}
    
  ,
  greeting:{
    fontSize:35,
    margin:20,
    color:"white",
    fontWeight:"bold",
    

  },
  

  button: { backgroundColor: "#e075cc", paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25, marginTop: 50 },
  text: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
  

