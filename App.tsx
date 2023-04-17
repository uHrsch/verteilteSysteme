import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon, IconComponentProvider, Pressable, ThemeProvider } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text } from 'react-native';
import ContextChain from "./components/ContextChain";
import { useEditIconContext } from "./contexts/EditIconContext";
import { useStorageContext } from "./contexts/StorageContext";
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";
import { ChatParams } from "./views/RootStackParams";
import Settings from "./views/Settings";
import React, { useState } from "react";
import{ Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from "react-native-popup-menu";
import { useCreateGroupContext } from "./contexts/CreateGroupContext"
import { defaultStyles } from "./styles/styles";
import { ConnectionStatus, useConnectionContext } from "./contexts/ConnectionContext";

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#191E21",
        padding: 10,
    },
    menuOption: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    }

})

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <ContextChain>
            <MenuProvider>
                <Navigation/>
            </MenuProvider>
        </ContextChain>
    </IconComponentProvider>
  );
}

function Navigation() {

    const { open } = useEditIconContext()
    const { getQrCodeContent } = useCreateGroupContext()
    const { connectionStatus, isInGroup } = useConnectionContext()

    return (
        <NavigationContainer theme={{
            colors: {
                background: "#232a2f",
                border: "white",
                primary: "#3d84c5",
                text: "white",
                card: "#232a2f",
                notification: "#434749",
            },
            dark: true,
        }}>
            <StatusBar backgroundColor={"#232a2f"}/>
            <Stack.Navigator initialRouteName="Chats">
                <Stack.Screen name="Chats" component={Chatlist} options={(e) => ({
                    headerRight: () => (
                        <Pressable onPress={() => {e.navigation.navigate("Settings")}}>
                            <Icon name="cog" size={24} color="white"/>
                        </Pressable>
                    )
                })}
                />
                <Stack.Screen name="Connect" component={Connect} />
                <Stack.Screen name="Camera" component={Camera} />
                <Stack.Screen 
                    name="Chat" 
                    options={(e) => ({ 
                        title: `Chat`,
                        headerRight: () => (
                            <Menu>
                                <MenuTrigger>
                                    <Icon name="dots-vertical" size={24} color="white"/>
                                </MenuTrigger>
                                <MenuOptions optionsContainerStyle={styles.menu}>
                                    {!isInGroup && (
                                        <MenuOption style={styles.menuOption} onSelect={open}>
                                            <Icon name="pencil" size={24} color={"white"}/>
                                            <Text style={defaultStyles.text}>Change name</Text>
                                        </MenuOption>
                                    )}
                                    {connectionStatus == ConnectionStatus.CONNECTED && (
                                        <MenuOption 
                                            style={styles.menuOption} 
                                            onSelect={() => {
                                                e.navigation.navigate("Connect", {qrCodeContent: getQrCodeContent()})
                                            }} 
                                        >
                                                <Icon name="account-group" size={24} color={"white"}/>
                                                <Text style={defaultStyles.text}>Open Group</Text>
                                        </MenuOption>
                                    )}
                                </MenuOptions>
                            </Menu>
                        )
                    })}
                >
                    {props =>(
                        <Chat 
                            id={(props.route.params as ChatParams).id} 
                            {...props}/>
                    )}
                </Stack.Screen>
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}