import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet,Image } from 'react-native';
import { Agenda, Calendar, CalendarList, ExpandableCalendar,CalendarProvider, AgendaList } from 'react-native-calendars';
import { getEntries } from '../Database/database'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';



const CalenderScreen = () => {
  const [data,setData]=useState([])
  const [filterD,setFilterD]=useState([])
  const [selectedDate,setSelectedDate]=useState("");
  const [expand,setExpand]=useState(null)
  
  const emoji = {
    1:require("../../assets/loved.png"),
    2:require("../../assets/very-happy.png"),
    3:require("../../assets/happy.png"),
    4:require("../../assets/ok.png"),
    5:require("../../assets/bad.png"),
    6:require("../../assets/very-bad.png"),
    7:require("../../assets/angry.png")

};
  
  useFocusEffect(
    useCallback(()=>{
      const entries=getEntries()
      
    setData(entries)
    const today=new Date().toISOString().split("T")[0]
    setSelectedDate(today)
    },[])
  )
  

 const markedDates=data.reduce((acc,i)=>{
  if(!acc[i.date]){
  acc[i.date]={dots:[]}
  }
  acc[i.date].dots.push({color:i.moodColor||"black"})

  return acc

 },{})

if(selectedDate){
  markedDates[selectedDate]={
    ...(markedDates[selectedDate]||{}),
    selected:true,
    selectedColor:"pink"
  }
}

useEffect(()=>{
  
   
  const filter=data.filter(
  i=>i.date===selectedDate

 ).sort((a,b)=>b.timeSorted-a.timeSorted);
 setFilterD(filter);

},[selectedDate,data])
 





 


  
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fee5fd"}}>


      


      <Calendar
      markingType='multi-dot'
      onDayPress={day=>setSelectedDate(day.dateString)}
      markedDates={
        markedDates
      
      }
      theme={{
  
      calendarBackground: "#f0dbeb",
      selectedDayBackgroundColor: "#FF6B6B",
      selectedDayTextColor: "#fff",
      todayTextColor: "#5F27CD",
      arrowColor: "#5F27CD",
      monthTextColor: "#2F2E41",
      textMonthFontSize: 18,
      textDayFontSize: 16,
      
}}



      />

      <View style={styles.entryContainer}>
        <FlatList 
        data={filterD}
        contentContainerStyle={{paddingBottom:80}}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>(
          < View style={[styles.list,{backgroundColor:item.moodColor}]}>
            
           <View><Text style={styles.time}>{item.time}</Text></View>
           <View style={styles.divider}></View>
            <View style={styles.textBox}>
              
              <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={expand===item.id?undefined:2} ellipsizeMode='tail' style={styles.text}>{item.text}
              </Text>
              {item.text.length>60&&(<Text onPress={()=>setExpand(expand===item.id?null:item.id)} >
                {expand===item.id?" .read less":"... read more"}</Text>)}
            </View>
            
            <View>
              
              <Image style={styles.img} source={emoji[Number(item.moodImage)]}/></View>

          </View>
        )}
        ListEmptyComponent={<Text style={styles.noEntries}>No entries</Text>}
        />
      </View>
    </SafeAreaView>
    
  )
}
export default CalenderScreen
const styles=StyleSheet.create({
entryContainer:{
  marginTop:20,
  flex:1,
 
  
  

},
list:{
  marginVertical:10,
 
  borderRadius:17,
  flexDirection:"row",
 alignItems:"flex-start",
  padding:15,
  marginVertical:8,
  
  
},
img:{

  width:40,
  height:40,
  borderRadius:18,
  alignSelf:"center"
},
title:{
  fontSize:16,
  fontWeight:"bold",
  marginBottom:5
}
,textBox:{
  flex:1,
  paddingRight:10
},
divider:{
  backgroundColor:"#333",
  height:"100%",
  width:2,
  opacity:0.4,
  marginHorizontal:10

  


},
time:{
  width:55,
  fontSize:20,
  fontWeight:"bold",
  textAlign:"center",
  marginTop:3,
  textAlignVertical:"center"

},
text:{
  color:"#333",
  lineHeight:20,

},
noEntries:{
  textAlign:"center",
  fontWeight:"bold",
  fontSize:20
}
}) 