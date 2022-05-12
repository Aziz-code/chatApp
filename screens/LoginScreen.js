import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import {Input, Button} from 'react-native-elements';
import { auth } from "../Fire";
// import { useEffect } from "react/cjs/react.production.min";
import {Ionicons} from '@expo/vector-icons'

const LoginScreen = ({navigation}) =>{
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const SignIn=()=>{
    auth.signInWithEmailAndPassword(email, password)
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    allert(errorMessage);
  });
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged
        (function (user){
            if (user) {
              navigation.replace('Chat');          
              const uid = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
              navigation.canGoBack()&&navigation.popToTop();
            }
          }) ;
          return unsubscribe
    }, [])
    return(
        <View style={styles.container}>
            <Input
            placeholders="enter your email"
            label="Email"
            leftIcon={{type:'material', name:'email'}}
            value={email}
            onChangeText={text=>setEmail(text)}
            />
            <Input
            placeholders="enter your password"
            label="Password"
            leftIcon={{type:'material', name:'lock'}}
            value={password}
            onChangeText={text=>setPassword(text)}
            secureTextEntry
            />
            <Button title="sign in" onPress={SignIn} style={styles.button}  />
            <Button title="register" style={styles.button}  onPress={()=>navigation.navigate('Register')}/>
        </View>
    )
}


const styles = StyleSheet.create({  
    button:{
        width:200,
        marginTop:10,

    },
    container:{
        flex: 1,
        alignItems:'center',
        padding:20
    }
})
export default LoginScreen