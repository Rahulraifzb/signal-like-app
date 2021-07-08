import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet,View } from 'react-native'
import { Icon,Button } from 'react-native-elements'
import { Input } from 'react-native-elements/dist/input/Input'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [chat,setChat] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle:"Chats"
        })
    },[navigation])

    const createChat = async () => {
        await db.collection("chats").add({
            chatName:chat
        })
        .then(() => {
            navigation.goBack()
        })
        .catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a Chat name" 
                value={chat}
                type="text"
                onChangeText={(text) => setChat(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
                onSubmitEditing={createChat}
            />
           <Button 
                disabled={!chat}
                title="Create new Chat " 
                onPress={createChat}
                containerStyle={styles.button} 
            />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    },
    button:{
        color:"black"
    }
})
