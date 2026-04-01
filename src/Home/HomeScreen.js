import { Modal,Pressable,View, Text,TouchableOpacity,SectionList,Image , StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getEntries } from '../Database/database'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { tr } from 'date-fns/locale'
import { deleteSingleEntry } from '../Database/database'
import { stickers } from '../Extra/Stickers'
const HomeScreen = ({navigation}) => {

  const emoji = {
    1:require("../../assets/loved.png"),
    2:require("../../assets/very-happy.png"),
    3:require("../../assets/happy.png"),
    4:require("../../assets/ok.png"),
    5:require("../../assets/bad.png"),
    6:require("../../assets/very-bad.png"),
    7:require("../../assets/angry.png")

};


  const [data,setData]=useState([])
  const [activeCard,setActiveCard]=useState(false)
  const [cardId,setCardId]=useState(null)
 const [editdata,setEditData]=useState()
 const [seeEntry,setSeeEntry]=useState(null)
 const [seeEntryPage,setSeeEntryPage]=useState(false)




  const loadingDataAndSorting=()=>{
    const entries=getEntries()
      const sortedEntries=entries.sort((a,b)=>{
        if(a.date===b.date){
          return b.timeSorted -a.timeSorted;

        }
        return new Date(b.date)-new Date(a.date);

      })
      const grouped=sortedEntries.reduce((acc,item)=>{
        if(!acc[item.date]){
          acc[item.date]=[];

        }
        acc[item.date].push(item);
        return acc;
      },{})
      const finalFormat=Object.keys(grouped).map(date=>({
        title:date,
        data:grouped[date]

      }));
      setData(finalFormat)
  }
  useFocusEffect(
    useCallback(()=>{
      loadingDataAndSorting();
       

    },[])

  )
  
  
  
  
 
  
  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.heading}>Dairy</Text>
      {data.length===0?(
        <Text style={styles.noEntries}>No Entries Yet</Text>
      ):(
        <SectionList
        sections={data}
        keyExtractor={(item)=>item.id}
        renderSectionHeader={({section})=>(<Text style={styles.headerText}>{section.title}</Text>)}
        ListFooterComponent={<View style={{height:60}}></View>}
       renderItem={({item})=>(
        <TouchableOpacity 
        onPress={()=>{setSeeEntry(item)
          setSeeEntryPage(true)


        }}
        onLongPress={()=>{setActiveCard(true) 
          setEditData(item)
        setCardId(item.id)}} style={[styles.card,{backgroundColor:item.moodColor}]} key={item.id}>
         
          <View style={styles.cardContent}>
          <View style={styles.textContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          </View>
          <Image style={styles.img} source={emoji[item.moodImage]}/>
          

          </View>
          

        </TouchableOpacity>
       )}
       

       
          
        
       

        
        />
        
      )}
      <Modal
  visible={activeCard}
  transparent={true} 
  animationType="fade"
>
  <Pressable
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)', 
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onPress={() => {setActiveCard(false) 
      }} 
  >
    <View style={{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 12,
      minWidth: 200,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 10
    }}>
      <TouchableOpacity onPress={() => {  setActiveCard(false)
        navigation.navigate("AddEntery",{editdata:editdata})
       }}>
        <Text style={{marginVertical:10, fontSize:18}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
         deleteSingleEntry(cardId)
        setActiveCard(false)
        loadingDataAndSorting()

      }
        }>
        <Text style={{marginVertical:19, fontSize:20, color:"#e41313"}}>Delete</Text>
      </TouchableOpacity>
    </View>
  </Pressable>
</Modal>
      <Modal visible={seeEntryPage}>
       {seeEntry&&(
        
        

        <View style={{flex:1,paddingTop:100,backgroundColor:seeEntry.moodColor ,width:"100%",height:"100%" , alignItems:"center"}}>
          
          <View style={{flexDirection:"row",gap:200, marginBottom:100}}><Text onPress={()=>setSeeEntryPage(false)} style={{backgroundColor:"#ff4e4e",padding:10,borderRadius:10,fontSize:19,width:80}}>Cancle</Text><Text onPress={()=>{
            setSeeEntryPage(false)
            navigation.navigate("AddEntery",{editdata:seeEntry})}} style={{backgroundColor:"#f577cd",padding:10,borderRadius:10,fontSize:19,width:80,textAlign:"center"}}>Edit</Text></View>
          <Text style={{paddingHorizontal:20,fontWeight:"bold",fontSize:30,marginBottom:40}}>{seeEntry.title}</Text>
          <Text  style={{paddingHorizontal:20,fontSize:20}}>{seeEntry.text}</Text>
        {seeEntry.stickers &&
        (typeof seeEntry.stickers === "string"
          ? JSON.parse(seeEntry.stickers)
          : seeEntry.stickers
        ).map((sticker, i) => (
          <Image
            key={i}
            source={stickers[sticker.category]?.[sticker.name]}
            style={{
              position: "absolute",
              top: sticker.position.y,
              left: sticker.position.x,
              width: 80 * (sticker.scale || 1),
              height: 80 * (sticker.scale || 1),
              transform: [{ rotate: `${sticker.rotation || 0}deg` }],
            }}
          />
        ))}       
           
          

        <View style={{flexDirection:"row", marginTop:"auto",alignItems:"flex-end",gap:40,marginBottom:30
        }}>
            <Text style={{fontWeight:"bold"}}>{seeEntry.date}</Text>
            <Image style={{height:120,width:120 , borderRadius:60}}  source={emoji[seeEntry.moodImage]} />
            <Text style={{fontWeight:"bold"}} >{seeEntry.time}</Text>

          </View>
        </View>
        
        
       )}
       
       

      </Modal>
</SafeAreaView>
      
      
   
  )
}

export default HomeScreen
const styles=StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:15,
    paddingTop:9,
    backgroundColor:"#fee5fd",
    
    
  },
  noEntries:{
    textAlign:"center",
    marginTop:50,
    fontSize:18,
    color:"#888"
  },
  headerText:{
    fontSize:20,
    fontWeight:"bold",
    color:"#333"
  },
  card:{
    padding:10,
    borderRadius:12,
   
    marginVertical:7,
    
    
  },
  time:{
    fontSize:10,
    color:"#555",
    marginBottom:4
  },
  title:{
    fontSize:17,
    fontWeight:"500",
    marginBottom:3,
    color:"#222"
  },
  text:{
    color:"#333"
  },
  img:{
    width:45,
    height:45,
    borderRadius:50
  },
  cardContent:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    
    
  },
  textContainer:{
    width:"85%"
  },
  heading:{
    fontSize:20,
    fontWeight:"bold",
    paddingBottom:20
  }

})

