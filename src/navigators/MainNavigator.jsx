import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { Detail } from "../screens/Detail";
import { Search } from "../screens/Search";

const Stack = createNativeStackNavigator();

export function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={Home}
            />
            <Stack.Screen 
                name="Detail"
                component={Detail}
            />
            <Stack.Screen 
                name="Search"
                component={Search}
            />
        </Stack.Navigator>
    )
}