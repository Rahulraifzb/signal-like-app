import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { keyword } from "color-convert";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages,setMessages] = useState([])

  useLayoutEffect(() => {
    const unsubscribe = navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:messages[0]?.data.photoURL || "https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
    return unsubscribe
  }, [navigation,messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("message").add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        displayName:auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL,
    })
    setInput("")
  };

  useLayoutEffect(() => {
      const unsubscribe = db.collection("chats").doc(route.params.id).collection("message").orderBy("timestamp","desc").onSnapshot((snapshot) => setMessages(
        snapshot.docs.map((doc) => ({
            id:doc.id,
            data:doc.data()
        }))
      ))
      return unsubscribe
  },[route])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop:15}}>
                {
                    messages.map(({id,data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.receiver}>
                                <Avatar
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    containerStyle={{
                                        position:"absolute",
                                        bottom:-15,
                                        right:-5
                                    }}
                                    source={{
                                        uri:data.photoURL
                                    }}
                                />
                                <Text style={styles.receiveText}>
                                    {data.message}
                                </Text>
                            </View>
                        ):(
                            <View key={id} style={styles.sender}>
                                <Avatar 
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={30}
                                    containerStyle={{
                                        position:"absolute",
                                        bottom:-15,
                                        left:-5
                                    }}
                                    source={{
                                        uri:data.photoURL
                                    }}
                                />
                                <Text style={styles.senderText}>
                                    {data.message}
                                </Text>
                                <Text style={styles.senderName}>
                                    {data.displayName}
                                </Text>
                            </View>
                        )
                    ))
                }
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#286be6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
  receiver:{
    padding:15,
    backgroundColor:"#cecece",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative"
  },
  sender:{
    padding:15,
    backgroundColor:"#2b68e6",
    alignSelf:"flex-start",
    borderRadius:20,
    margin:15,
    maxWidth:"80%",
    position:"relative"
  },
  senderText:{
      color:"white",
      fontWeight:"500",
      left:10
  },
  senderName:{
      left:10,
      paddingRight:10,
      fontSize:10,
      color:"white"
  }
});
