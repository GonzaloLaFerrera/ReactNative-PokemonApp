import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./src/screens/Home";
import { MainNavigator } from "./src/navigators/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}




//Sin navegación!

/* import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./src/screens/Home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
} */