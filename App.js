import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ToastProvider } from "react-native-toast-notifications";

import WelcomeScreen from "./app/welcome";
import MenuScreen from "./app/menu";
import LoginScreen from "./app/login";
import DetailsScreen from "./app/details";
import FavoritesScreen from "./app/favorites";
import LikedProductsProvider from "./providers/LikedProductProvider";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Menu' component={MenuScreen} />
        <Stack.Screen name='Detail' component={DetailsScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <ToastProvider offset={50} placement='top' duration={2000}>
        <LikedProductsProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === "Login") {
                    iconName = focused
                      ? "information-circle"
                      : "information-circle-outline";
                  } else if (route.name === "Home") {
                    iconName = "home";
                  } else if (route.name === "Favorites") {
                    iconName = "heart";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen
                name='Home'
                component={MainStack}
                options={{ headerShown: false }}
              />
              <Tab.Screen name='Favorites' component={FavoritesScreen} />
              <Tab.Screen name='Login' component={LoginScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </LikedProductsProvider>
      </ToastProvider>
    </>
  );
}
