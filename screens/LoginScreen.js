import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button,Input,Image } from 'react-native-elements'
import { auth } from '../firebase'


const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                navigation.replace("Home")
            }
        })

        return unsubscribe;
    },[])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password)
        .then((user) => {})
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image 
                source={{
                    uri:"https://www.apkmirror.com/wp-content/uploads/2019/01/5c3b68be2c3ba.png"
                }}
                style={{
                    width:200,
                    height:200
                }}
            />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus 
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
                    onSubmitEditing={signIn}
                />
            </View>
            <Button 
                containerStyle={styles.button} 
                title="Login" 
                onPress={signIn}
            />
            <Button 
                containerStyle={styles.button} 
                type="outline"
                title="Register" 
                onPress={() => navigation.navigate("Register")}
            />
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

export default LoginScreen
