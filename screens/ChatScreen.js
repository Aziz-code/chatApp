import React,{useState, useCallback, useEffect, useLayoutEffect} from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useLayoutEffect } from 'react/cjs/react.production.min';
import {AntDesign} from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../Fire';
// import { useLayoutEffect } from 'react';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { GiftedChat } from 'react-native-gifted-chat';


const ChatScreen = ({navigation}) =>{

    const [show, setShow] = useState([]);
    // const onClick = emoji => {
    //     console.log(emoji);
    // };
    const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ])
//   }, [])

useLayoutEffect(()=> {
   const unsubscribe = db.collection('chats').orderBy('createdAt',
    'desc').onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>({
        _id:doc.data()._id,
        createdAt:doc.data().createdAt.toDate(),
        text:doc.data().text,
        user:doc.data().user
    }))
    ))

    return unsubscribe;

})

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id,
        createdAt,
        text,
        user
    }=messages[0]
    db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
    })
}, [])
    
       useLayoutEffect(()=>{
           navigation.setOptions({
               headerLeft: ()=>(
                   <View style={{
                    marginLeft:20
                }}>
                   <Avatar 
                   rounded
                   source={{
                       uri:auth?.currentUser?.photoURL
                   }}
               />
               </View>
           ),


               headerRight: ()=>(
                   <TouchableOpacity style={{
                       marginRight:30
                   }}
                   onPress={signOut}>

                   <AntDesign name="logout" size={24}
                   color="black" />
                   </TouchableOpacity>
               )
            
           })


       }, []) 

    const signOut = ()=>{
       auth.signOut().then(() => {
           // Sign-out successful.
           navigation.replace('LogIn')
         }).catch((error) => {
           // An error happened.
         });
    }
    return(
<>

            {/* <StatusBar barStyle="dark-content" /> */}
            {/* <TouchableOpacity onPress={() => setShow(!show)}>
               
            </TouchableOpacity>
            <EmojiBoard showBoard={show} onClick={onClick} /> */}
                   
         <GiftedChat
        messages={messages}
        
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name:auth?.currentUser?.displayName,
        //   emoji:auth?.currentUser?.EmojiBoard,
          avatar: auth?.currentUser?.photoURL
        }}
      /> 

</> 

      
    )
    }

export default ChatScreen;