import { useContext } from "react";
import CommentPost from "../src/components/CommentPost";
import CreatePostPage from "../src/components/CreatePost";
import HomePage from "../src/components/HomePage";
import Login from "../src/components/Login";
import PostDetail from "../src/components/PostDetail";
import UserProfile from "../src/components/Profil";
import UserDetail from "../src/components/ProfilDetail";
import Register from "../src/components/Register";
import SearchPage from "../src/components/SearchPage";
import { LoginContext } from "../context/LoginContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="DetailPost" component={PostDetail} options={{ headerShown: false }} />
      <Stack.Screen name="Comment" component={CommentPost} />
    </Stack.Navigator>
  );
}

function StackUser() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="searchpage" component={SearchPage} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
}

function StackProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profiles" component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetailS" component={UserDetail} />
    </Stack.Navigator>
  );
}
export function Checking() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
              } else if (route.name === "Create") {
                iconName = focused ? "add-circle" : "add";
              } else if (route.name === "Search") {
                iconName = focused ? "search-circle" : "search";
              } else if (route.name === "Profile") {
                iconName = focused ? "accessibility-sharp" : "accessibility-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={RootStack} options={{ headerShown: false }} />
          <Tab.Screen name="Create" component={CreatePostPage} options={{ headerShown: false }} />
          <Tab.Screen name="Search" component={StackUser} />
          <Tab.Screen name="Profile" component={StackProfile} />
          {/* <Tab.Screen name="ProfileDetail" component={UserDetail} /> */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          {/* // List of Authenticated Stack.Screen -- */}
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
