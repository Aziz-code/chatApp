import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import {Input, Button} from 'react-native-elements';
// import {Ionicons} from '@expo/vector-icons'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Fire";
import { NavigationContainer } from "@react-navigation/native";

const RegisterScreen = ({navigation}) =>{
    const [email, setEmail]=useState('');
    const [name, setName]=useState('');
    const [password, setPassword]=useState('');
    const [imageURL, setImageURL]=useState('');

    const register = ()=>{
        auth.createUserWithEmailAndPassword( email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    user.updateProfile({
        displayName: name, 
        photoURL: imageURL? imageURL: "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    });
    navigation.popToTop();
    }
    return(
        <View style={styles.container}>
            <Input
            placeholders="enter your name"
            label="name"
            leftIcon={{type:'material', name:'badge'}}
            value={name}
            onChangeText={text=>setName(text)}
            />
            
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

<Input
            placeholders="enter your image Url"
            label="profile picture"
            leftIcon={{type:'material', name:'face'}}
            value={imageURL}
            onChangeText={text=>setImageURL(text)}
            />
            <Button title="register" onPress = {register} 
            style={styles.Button}/>
        </View>
    )
}


const styles = StyleSheet.create({
    Button:{
        width:200,
        marginTop:10

    },
    container:{
        flex: 1,
        alignItems:'center',
        padding:10
    }
})
export default RegisterScreen