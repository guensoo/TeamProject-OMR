import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

//공통
import BottomTabMenu from './All/BottomTabMenu';
import { UserProvider } from './All/context/UserContext';

//메인
import Login from './Heo/pages/Login';
import Signup from './Heo/pages/Signup';
import FindId from './Heo/pages/FindId';
import FindPassword from './Heo/pages/FindPassword';
import MyPage from './Heo/pages/MyPage';
import linking from './Heo/utils/Linking';
import ResetPassword from './Heo/pages/ResetPassword';

//

// 박세현
import ReviewDetail from './Park/ReviewDetail';
import ReviewEdit from './Park/ReviewEdit';
import InfoDetail from './Park/InfoDetail';

//
import MovieListScreen from './Choi/MovieListScreen';
import OTTListScreen from './Choi/OTTListScreen';
import FindTheater from './Choi/components/FindTheater';
import MapScreen from './Choi/MapScreen';
import SearchList from './Choi/SearchList';

import AIRecommend from './Park/AIRecommend';
import { ReviewWrite } from './Kim/component/ReviewWrite';
import { SupportWrapper } from './Kim/supportCenter/SupportWrapper';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <UserProvider>
            <SafeAreaProvider>
                <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                    <Stack.Navigator initialRouteName="BottomTabMenu">
                        <Stack.Screen name="BottomTabMenu" component={BottomTabMenu} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={({ navigation }) => ({
                                title: "로그인",
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("BottomTabMenu", { screen: 'Home' })}
                                    >
                                        <Ionicons name="home-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                ),

                            })} />
                        <Stack.Screen name="Signup" component={Signup} options={{ title: '회원가입' }} />
                        <Stack.Screen name="OTTListScreen" component={OTTListScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MovieListScreen" component={MovieListScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="FindTheater" component={FindTheater} options={{ headerShown: false }} />
                        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AIRecommend" component={AIRecommend} options={{ headerShown: false }} />
                        <Stack.Screen name="SearchList" component={SearchList} options={{ headerShown: false }} />

                        <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
                        <Stack.Screen name="ReviewWrite" component={ReviewWrite} options={{ headerShown: false }} />
                        <Stack.Screen name="ReviewEdit" component={ReviewEdit} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="Support"
                            component={SupportWrapper}
                            options={({ navigation }) => ({
                                title: "고객센터",
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("BottomTabMenu", { screen: 'Home' })}
                                    >
                                        <Ionicons name="home-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                ),

                            })} />

                        <Stack.Screen name="InfoDetail" component={InfoDetail} options={{ headerShown: false }} />

                        <Stack.Screen name="FindId" component={FindId} options={{ headerShown: false }} />
                        <Stack.Screen name="FindPassword" component={FindPassword} options={{ headerShown: false }} />
                        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="MyPage"
                            component={MyPage}
                            options={({ navigation }) => ({
                                title: "마이페이지",
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("BottomTabMenu", { screen: 'Home' })}
                                    >
                                        <Ionicons name="home-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                ),

                            })} />

                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </UserProvider>
    );
}