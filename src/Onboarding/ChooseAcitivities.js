import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'



const Activities=[
    {
  id: 'mental',
  title: 'Mental & Emotional Health',
  subtypes: [
    'Meditation',
    'Journaling',
    'Therapy',
    'Self-reflection',
    'Breathing exercises',
    'Mindfulness'
  ],
},
{
  id: 'physical',
  title: 'Physical Health',
  subtypes: [
    'Gym',
    'Running',
    'Walking',
    'Yoga',
    'Stretching',
    'Sports'
  ],
},
{
  id: 'work',
  title: 'Work / Study',
  subtypes: [
    'Office work',
    'Studying',
    'Homework',
    'Exams',
    'Meetings',
    'Projects'
  ],
},
{
  id: 'home',
  title: 'Home & Daily Life',
  subtypes: [
    'House chores',
    'Cleaning',
    'Cooking',
    'Family time',
    'Resting',
    'Sleeping'
  ],
},
{
  id: 'social',
  title: 'Social Life',
  subtypes: [
    'Friends',
    'Family',
    'Dating',
    'Social events',
    'Online chatting'
  ],
},
{
  id: 'leisure',
  title: 'Entertainment & Leisure',
  subtypes: [
    'Watching TV',
    'Movies',
    'Gaming',
    'Music',
    'Reading',
    'Scrolling social media'
  ],
},
{
  id: 'growth',
  title: 'Personal Growth',
  subtypes: [
    'Learning new skills',
    'Online courses',
    'Reading self-help',
    'Practicing a hobby',
    'Goal planning'
  ],
},
{
  id: 'wellness',
  title: 'Health & Wellness',
  subtypes: [
    'Doctor visit',
    'Medication',
    'Healthy eating',
    'Dieting',
    'Hydration'
  ],
},
{
  id: 'spiritual',
  title: 'Spiritual',
  subtypes: [
    'Prayer',
    'Gratitude',
    'Religious study',
    'Spiritual reflection'
  ],
}

]

const ChooseAcitivities = ({navigation}) => {
    const [selected,setSelected]=useState([])
    const toggleSelect=(id)=>{
        if (selected.includes(id)){
            
            setSelected(selected.filter((s)=>s!==id));
        } else{
            
            setSelected([...selected,id])
        }
    }
  return (
    
    <ScrollView  contentContainerStyle={styles.container}>
        <Text style={styles.mainheading}>Choose Activities</Text>
       <Text style={styles.subheading}>Select one or more that match your daily life routine </Text>
      {Activities.map((act)=>(
        
        <TouchableOpacity
        key={act.id}
        style={[styles.card,
            selected.includes(act.id)&& styles.selectedCard
        ]}
        onPress={()=>toggleSelect(act.id)}
        >
            <Text style={styles.title}>{act.title}</Text>
            <View style={styles.suboptions}>
            {act.subtypes.map((sub)=>(
                <View key={sub} style={styles.typeChip}>
                <Text  style={styles.subtypes}>
                    .{sub}
                </Text>
                </View>
                
            ))}
            </View>
        </TouchableOpacity>
        
      ))}
      <TouchableOpacity style={styles.btn}
      onPress={()=>navigation.navigate("PasswordSetup")}
      
      ><Text  style={styles.btntxt}>Next</Text></TouchableOpacity>
    </ScrollView>
    
  )
}

export default ChooseAcitivities
const styles=StyleSheet.create({
    container:{
        padding:20,
        paddingBottom:40
    },
    mainheading:{
        fontSize:26,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:6
    },
    subheading:{
        fontSize:16,
        textAlign:"center",
        color:"#666",
        marginBottom:20
,
    },
    card:{
        backgroundColor:"#fff",
        padding:18,
        borderRadius:16,
        marginBottom:14,
        shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,

    
    elevation: 4,
    },
    selectedCard:{
        backgroundColor: "#e8f2ff",
    borderWidth: 1,
    borderColor: "#4c9aff",
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        marginBottom:10
    },
    suboptions:{
        flexDirection:"row",
        flexWrap:"wrap"

    },
    typeChip:{
        backgroundColor:'#f1f1f1',
        paddingHorizontal:10,
        paddingVertical:6,
        borderRadius:20,
        marginRight:8,
        marginBottom:8
    },
    subtypes:{
        color:"#444"

    },
    btn:{
        backgroundColor:"#4c9aff",
        alignItems:"center"
        ,margin:20,
        borderRadius:30,
        paddingVertical:30

    }



})