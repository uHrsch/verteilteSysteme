import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icon, IconComponentProvider, Pressable } from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import ContextChain from "./components/ContextChain";
import { useEditIconContext } from "./contexts/EditIconContext";
import { useStorageContext } from "./contexts/StorageContext";
import Camera from "./views/Camera";
import Chat from "./views/Chat";
import Chatlist from "./views/Chatlist";
import Connect from "./views/Connect";
import { ChatParams } from "./views/RootStackParams";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // @ts-ignore
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <ContextChain>
            <Navigation/>
        </ContextChain>
    </IconComponentProvider>
  );
}

function Navigation() {

    const { open } = useEditIconContext()
    const { getName } = useStorageContext()

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
                <Stack.Screen name="Chats" component={Chatlist} />
                <Stack.Screen name="Connect" component={Connect} />
                <Stack.Screen name="Camera" component={Camera} />
                <Stack.Screen 
                    name="Chat" 
                    options={() => ({ 
                        title: `Chat`,
                        headerRight: () => (
                            <Pressable onPress={open}>
                                <Icon name="pencil" size={24} color="white"/>
                            </Pressable>
                        )
                    })}
                >
                    {props =>(
                        <Chat 
                            id={(props.route.params as ChatParams).id} 
                            {...props}/>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}