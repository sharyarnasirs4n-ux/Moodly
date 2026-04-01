
import { Pressable,Alert,View, Text,TouchableOpacity,TextInput,Image,StyleSheet,ImageBackground,Modal} from 'react-native'
import { stickers } from '../Extra/Stickers'
import StickerAdd from "../../assets/image-gallery-3.png"
import React, { useEffect, useState,useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { insertEntry } from '../Database/database'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import down from "../../assets/down.png"
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur'
import { entryUpdate } from '../Database/database'
import { Keyboard,TouchableWithoutFeedback } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  
  
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated'
import reload from "../../assets/synchronise.png"
const AddEnteryScreen = ({route,navigation}) => {

   
    

  const img={
    1:require("../../assets/loved.png"),
    2:require("../../assets/very-happy.png"),
    3:require("../../assets/happy.png"),
    4:require("../../assets/ok.png"),
    5:require("../../assets/bad.png"),
    6:require("../../assets/very-bad.png"),
    7:require("../../assets/angry.png")




  }

 const moods=[
  {
    label:"In Love",
    image:1,
    color:"rgba(244, 143, 177, 0.25)",
    solid:"#F48FB1"
  }
  ,
  {
    label:"Excited",
    image:2,
    color:"rgba(255, 215, 0, 0.25)",
    solid:"#FFD700"
  },
  {
    label:"Happy",
    image:3,
    color:"rgba(79, 195, 247, 0.25)",
    solid:"#4FC3F7"

  },
  {
    label:"OK",
    image:4,
    color:"rgba(255, 183, 77, 0.25)",
    solid:"#FFB74D"
  },
  {
    label:"Meh",
    image:5,
    color:"rgba(255, 112, 67, 0.25)",
    solid:"#FF7043"
  },
  {
    label:"Very-Sad",
    image:6,
    color:"rgba(206, 74, 74, 0.25)",
    solid:"#ce4a4a"
    
  },
  {
    label:"Angry",
    image:7,
    color:"rgba(183, 28, 28, 0.25)",
    solid:"#B71C1C"
  }

]
 
  const now =new Date()
  const stickersCategories=Object.keys(stickers)
   const [selectedCategoryForStickers,setSelectedCategoryForStickers]=useState(stickersCategories[0])
   const [selectedSticker,setSelectedSticker]=useState([])
   const [routeEditData,setRouteEditData]=useState(null)
   const [showStickers,setShowStickers]=useState(false)
   const [mood,setMood]=useState(null)
  const [title,setTitle]=useState("")
  const [text,setText]=useState("")
  const [moodShow,setModeShow]=useState(false)
  const [selectedDate,setSelectedDate]=useState(new Date())
  const [showDateChanger,setShowDateChanger]=useState(false)
  
  

  useEffect(()=>{
    const editValue=route?.params?.editdata
    if(editValue){
      
      setRouteEditData(editValue)
      setMood(moods.find(m=>m.label===editValue?.mood)||null)
      setTitle(editValue?.title||"")
      setText(editValue?.text||"")
      
      setSelectedDate(new Date(editValue.date))
      setSelectedSticker(editValue.stickers||[])


    }
  },[route?.params?.editdata])


  const DraggableSticker = ({ sticker, source, onUpdate }) => {
  const translateX = useSharedValue(sticker.position.x);
  const translateY = useSharedValue(sticker.position.y);
  const scale = useSharedValue(sticker.scale || 1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);

  // 👉 Drag
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(
        sticker.id,
        translateX.value,
        translateY.value,
        scale.value
      );
    });

  // 👉 Pinch (Zoom)
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = startScale.value * e.scale;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(
        sticker.id,
        translateX.value,
        translateY.value,
        scale.value
      );
    });

  // 👉 Combine both
  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.Image
        source={source}
        style={[{ width: 80, height: 80 }, animatedStyle]}
      />
    </GestureDetector>
  );
};


const updateSticker = (id, x, y, scale) => {
  setSelectedSticker(prev =>
    prev.map(s =>
      s.id === id
        ? { ...s, position: { x, y }, scale }
        : s
    )
  );
};

  const saveEntry=()=>{
    if(!text){
      Alert.alert("please type what is in your mind")
      return

    }
    const entry={

      id:routeEditData?routeEditData.id:Date.now().toString(),

      mood:         mood ? mood.label : "no mood",
      moodColor: mood ? mood.color : null,
      moodImage: mood ? mood.image : null,
      title:title?title:"No Title",
      text,
      date:selectedDate.toISOString().split(("T"))[0],
      time:routeEditData?routeEditData.time:now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
      timeSorted:routeEditData?routeEditData.timeSorted:now.getHours()*60+now.getMinutes(),
      stickers:selectedSticker
      
     


    }
    
    
  
    if(routeEditData){
      entryUpdate(entry)
      setMood(null);setText("");setTitle("")
      setRouteEditData(null)
      setSelectedDate(new Date())
      setSelectedSticker([])
      

    }else{
      insertEntry(
      entry);
      setMood(null);setText("");setTitle("")
         
    }
    
    navigation.navigate("Home")


    

  };
  
      
  
  const handleChangingDate=(event,date)=>{
    if(date){
      setSelectedDate(date)
    }
    setShowDateChanger(false)

  }
  const reloadEntnries=()=>{
    setMood(null)
    setTitle("")
    setText("")
    setSelectedDate(new Date())
    setShowStickers(false)
    setSelectedSticker([])
    
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
    <View style={[styles.container,{backgroundColor:mood?mood.color:"#fee5fd"},{flex:1}]}>
      <SafeAreaView>
      <TouchableOpacity onPress={()=>setShowDateChanger(true)} style={styles.moodbtn} ><Text style={styles.moodtxt}>{selectedDate.toISOString().split(("T"))[0]}</Text><Image source={down} style={{width:20,height:20}}/></TouchableOpacity>
      <Modal animationType="fade" transparent={true}    visible={showDateChanger}>
        <Pressable onPress={()=>setShowDateChanger(false)} style={{flex: 1,alignItems:"center",paddingTop:70, backgroundColor: "transperent"}}>
         <BlurView intensity={80} style={StyleSheet.absoluteFill} />
          
          <View style={{backgroundColor:"#30292f",padding:20,borderRadius:20}}>

        <DateTimePicker value={selectedDate}
        mode="date"
        display="inline"
        onChange={handleChangingDate}
        style

        />
        </View>
        </Pressable>

      </Modal>

      <View style={{borderWidth:0.5}}></View>
      <TouchableOpacity style={styles.moodbtn} onPress={()=>setModeShow(p=>!p)}>

        <Text style={styles.moodtxt}>

        {mood?<Image style={styles.moodemoji} source={img[mood.image]}/>:"Choose Mood"}
        
        </Text>
      </TouchableOpacity >
      {moodShow&&(
        <View style={styles.moodcontainer}>
          {
            moods.map((item,i)=>(
              <TouchableOpacity key={i}
              style={[styles.notactive,mood?.label===item.label&&styles.active]}
              onPress={()=>{
                setMood(item)
                setModeShow(false)
              }}
              >
                <Image source={img[item.image]} style={styles.moodemoji} />
                <Text>{item.label}</Text>

              </TouchableOpacity>
            ))
          }
        </View>
      )}

      
      <TextInput style={styles.title} value={title} onChangeText={setTitle} placeholder='Title'/>
      <TextInput style={[styles.text,styles.textarea]} value={text} onChangeText={setText} multiline numberOfLines={15} placeholder='What are you up to !!!' />
      
      <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={()=>setShowStickers(p=>!p)} style={styles.entrybtn}><Image style={{width:30,height:30}} source={StickerAdd}/></TouchableOpacity>
                       <TouchableOpacity onPress={reloadEntnries} style={{alignSelf:"center",
    
    alignItems:"center",
    justifyContent:"center", width:70,
    height:70,
    marginTop:35,
    borderRadius:35,}}><Image style={{height:60,width:60}} source={reload}/></TouchableOpacity>



            <TouchableOpacity style={[styles.entrybtn,{backgroundColor:mood?mood.solid:"black"}]} onPress={saveEntry}><Text style={styles.addbtn}>{routeEditData?"✓":"+"}</Text></TouchableOpacity>
   </View>

   <ScrollView horizontal showsHorizontalScrollIndicator={false}   contentContainerStyle={{flexDirection:"row"}}>

   {showStickers&&stickersCategories.map(s=>(
    <TouchableOpacity key={s} 
    onPress={()=>setSelectedCategoryForStickers(s)}
    style={[styles.stkrCategory,{backgroundColor:selectedCategoryForStickers===s?"#dca7db":"#bbb5bb",}]}
    ><Text >{s}</Text></TouchableOpacity>
    
   ))
  }

   
  </ScrollView>
  <View style={{height:200}}>
  <ScrollView   contentContainerStyle={{ flexWrap:"wrap", flexDirection:"row"}}>
    
  {showStickers&& selectedCategoryForStickers && Object.entries(stickers[selectedCategoryForStickers]).map(([key,value])=>(
   <TouchableOpacity style={{margin:10}} key={key} onPress={() => {
  const newSticker = {
  id: Date.now().toString(),
  category: selectedCategoryForStickers,
  name: key,
  position: { x: 50, y: 50 },
  scale: 1,
  
};
  setSelectedSticker((prev) => [...prev, newSticker]);
}}><Image style={{width:60,height:60}} source={value}/></TouchableOpacity>
  ))}
  
  </ScrollView>


  </View>
  

      
</SafeAreaView>
{selectedSticker.map((sticker) => (
  <DraggableSticker
    key={sticker.id}
    sticker={sticker}
    source={stickers[sticker.category][sticker.name]}
    onUpdate={updateSticker}
  />
))}

      
    </View>
    </TouchableWithoutFeedback>

  )
}

export default AddEnteryScreen

const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    
   
    
  },
  entrybtn:{
    alignSelf:"center",
    
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"black",
    
    width:70,
    height:70,
    marginTop:35,
    borderRadius:35,
    
    
    
  },
  addbtn:{
    fontSize:40,
    color:"white",
    fontWeight:"bold",
    
  },
  moodbtn:{
    padding:10,
    
    borderRadius:10,
    marginVertical:10,
    alignItems:"center"

  },
  moodtxt:{
    fontSize:16,
    fontWeight:"bold"
  },
  moodcontainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },
  notactive:{
    width:"30%",
    alignItems:"center",
    padding:10,
    marginVertical:10,
    borderRadius:10
  },
  active:{
    backgroundColor:"#d0f0ff"
  },
  moodemoji:{
    width:90,
    height:90,
    marginBottom:5,
    borderRadius:50
  },
  title:{
    
    borderRadius:10,
    padding:12,
    marginVertical:10,
    fontSize:30,
    alignSelf:"center"
  },
  textarea:{
    height:190,
    textAlignVertical:"top",
    fontSize:20,
    borderRadius:10,
    padding:5,
    alignSelf:"center"
    
  },
  stkrCategory:{
    padding:10,
    margin:10,
    flexDirection:"row"   ,
    
    
    borderRadius:15
  },
  



})