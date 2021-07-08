import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { Button,Input,Image } from 'react-native-elements'
import { auth } from '../firebase'


const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [imageUrl,setImageUrl] = useState("")


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Login",
        })
    })


    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || "https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
            })
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <Input 
                    placeholder="Email"  
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Input 
                    placeholder="Profile Picture URL (optional)" 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)}
                    onSubmitEditing={register}
                />
            </View>
            <Button raised onPress={register} title="Register" />
            <View style={{height:100}} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white"
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop:10,
    },
})

export default RegisterScreen
