import { View, Text,Image,StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getEntries } from '../Database/database'
import { useWindowDimensions } from 'react-native'
import { PieChart, BarChart } from 'react-native-chart-kit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { format,subDays } from 'date-fns'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import down from "../../assets/down.png"
const colorToHex=
  {
    "rgba(244, 143, 177, 0.25)":"#F48FB1"
  
  ,
  
    "rgba(255, 215, 0, 0.25)":"#FFD700"
  ,
  
    "rgba(79, 195, 247, 0.25)":"#4FC3F7"

  ,
  
    "rgba(255, 183, 77, 0.25)":"#FFB74D"
  ,
  
    "rgba(255, 112, 67, 0.25)":"#FF7043"
  ,
  
    "rgba(206, 74, 74, 0.25)":"#ce4a4a"
    
  ,
  
    
    "rgba(183, 28, 28, 0.25)":"#B71C1C"
  }
  const moodImg={
    "In Love":require("../../assets/loved.png"),
    "Excited":require("../../assets/very-happy.png"),
    "Happy":require("../../assets/happy.png"),
    "OK":require("../../assets/ok.png"),
    "Meh":require("../../assets/bad.png"),
    "Very-Sad":require("../../assets/very-bad.png"),
    "Angry":require("../../assets/angry.png"),
    "no mood":require("../../assets/no-talk.png")
  




  }

  
const StatsScreen = () => {
  
  
const [timeDisplay, setTimeDisplay] = useState(7);


const [data,setData]=useState([])
useFocusEffect(useCallback(()=>{setData(getEntries())},[]))


const counts={}

data.forEach((i)=>{
  if(!(i.mood in counts)){
    counts[i.mood]=1

  }else{
    counts[i.mood]++
  }
  })

 



const {height,width}=useWindowDimensions()
const countsKey = Object.keys(counts);

const mostFremood =
  countsKey.length > 0
    ? countsKey.reduce((a, b) => (counts[a] > counts[b] ? a : b))
    : null;

const leastFremood =
  countsKey.length > 0
    ? countsKey.reduce((a, b) => (counts[a] < counts[b] ? a : b))
    : null;


const dataForPieChart=Object.keys(counts).map(m=>{
  const entry=data.find(d=>d.mood===m)
  return {
    name:m,
    population:counts[m],
    color:entry?colorToHex[entry.moodColor]:"#be8ec1",
    legendFontColor:"#333",
    legendFontSize:14

  }
})

const filteredEntries=(entries,days)=>{
  const startdate=subDays(new Date(),days-1)
  const newFilteredData=entries.filter(e=>{
    const entryDate=new Date(e.date)
    return entryDate>=startdate
  })
  
  return newFilteredData
}

const moodCount=(entries)=>{
  const count={}
  entries.forEach(e=>{
    if (count[e.mood]){
      count[e.mood]++
    }else{
      count[e.mood]=1
    }

  })
  
  return count
  

}
const filteredDataforBarChart=filteredEntries(data,timeDisplay)

const moodCounts=moodCount(filteredDataforBarChart)
const label=Object.keys(moodCounts)
const value=Object.values(moodCounts)
const barColors = label.map(m => {
  const entry = filteredDataforBarChart.find(e => m === e.mood);
  return entry && colorToHex[entry.moodColor]
    ? colorToHex[entry.moodColor]
    : "#9d859d";
});



  



  return (
    <SafeAreaView style={{flex:1,alignItems:"center",backgroundColor:"#fee5fd",paddingBottom:60}}>
      <ScrollView  contentContainerStyle={{alignItems:"center",paddingBottom:10}}>
      
      <View style={{justifyContent:"center"}}>
        <PieChart
        data={dataForPieChart}
        width={width - 16}
        height={220}
        
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        accessor="population"
        backgroundColor="#fee5fd"
        
       
        
        
      />
      <View
    style={{
      position: "absolute",
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "white",
      left:48
      
    }}
  ></View>

      </View>
      <View style={styles.counting} >
      <View  style={styles.entrybox}>
        <Text style={styles.boxText}>Entries</Text>
        <Text style={styles.boxText}>{data.length?data.length:0}</Text>
      </View>
      <View style={styles.entrybox}>
        <Text style={styles.boxText}>Most Frequent</Text>
        <Text style={styles.boxText}>
        {mostFremood?mostFremood:null}
        </Text>

      </View>
      <View style={styles.entrybox}>
        <Text style={styles.boxText}>
          Least Frequent
        </Text >
        <Text style={styles.boxText}>{leastFremood?leastFremood:null}</Text>

      </View>
      
      </View>
      <View style={{alignSelf:"flex-start",marginTop:60,paddingRight:20}}> 
                <View style={{flexDirection:"row", justifyContent:"flex-end",margin:5,}}><TouchableOpacity onPress={()=> setTimeDisplay("7")}><Text style={{padding:5,backgroundColor:timeDisplay==="7"?"#e075cc":"gray"}}>7 Days</Text></TouchableOpacity><TouchableOpacity onPress={()=>setTimeDisplay("30")}><Text style={{padding:5,backgroundColor:timeDisplay==="30"?"#e075cc":"gray"}}>30 Days</Text></TouchableOpacity></View>

  <BarChart
  
    data={{
      labels: label,
      datasets: [
        {
          data: value,
          colors:barColors.map(c=>()=>c)
        }
      ]
    }}
    withHorizontalLabels={false}
    showValuesOnTopOfBars
    withInnerLines={false}
    withCustomBarColorFromData={true}
    width={width-16}
    height={350}
    fromZero
    chartConfig={{
      backgroundColor: "#fee5fd",
      backgroundGradientFrom: "#fee5fd",
      backgroundGradientTo: "#fee5fd",
      decimalPlaces: 0,

   
      color: (opacity = 1) => `rgba(0,0,0,${opacity})`,

      labelColor: (opacity = 1) =>
        `rgba(0,0,0,0)`,
    }}
  />
  <View style={styles.imgBox}>
    
    {
label
  .filter(i => Object.keys(moodImg).includes(i))
  .map(e => (
    <View key={e} style={{ flex: 1, alignItems: "center",marginLeft:60 }}>
      <Image style={styles.img} source={moodImg[e]} />
    </View>
  ))}
    
  </View>

</View>
     
        

</ScrollView>
     

    </SafeAreaView>
  )
}

export default StatsScreen

const styles=StyleSheet.create({
  counting:{
    flexDirection:"row",
    marginTop:70,
    width :"95%",
   justifyContent: "space-evenly",
   borderWidth:1,
   padding:20,
   borderRadius:10,
   backgroundColor:"#fee5fd"

  },
  entrybox:{
    alignItems:"center",
    justifyContent:"center",
    gap:15
  },
  boxText:{
    fontSize:17,
    fontWeight:"bold"
  },
  img:{
    width:30,
   height:30,
   borderRadius:15,
   
  },
  imgBox: {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  paddingHorizontal: 20, 
  
}

})