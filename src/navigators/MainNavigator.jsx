import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { Detail } from "../screens/Detail";
import { Search } from "../screens/Search";

import { TouchableOpacity, Text } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={Home}
                options={({ navigation}) => ({
                    headerTitle:'Pokédex',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}> 
                            <MaterialIcons name="search" color="#000000" size={32}/> 
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen 
                name="Detail"
                component={Detail}
                options={{ 
                    presentation: 'modal',
                    modalTransitionStyle: 'fade'
                }} // se supone que tiene que ser modal este Screen pero no esta funcionando correctamente
            />
            <Stack.Screen 
                name="Search"
                component={Search}
            />
           
        </Stack.Navigator>
    )
}