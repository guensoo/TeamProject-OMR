import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

//공통
import BottomTabMenu from './All/BottomTabMenu';

//메인
import Home from './Heo/pages/Home';

//
import ReviewList from './Kim/ReviewList';

// 박세현
import ReviewDetail from './Park/ReviewDetail';

//
import MovieScreen from './Choi/MovieScreen';
import MovieListScreen from './Choi/MovieListScreen';
import OTTScreen from './Choi/OTTScreen';
import OTTListScreen from './Choi/OTTListScreen';
import FindTheater from './Choi/components/FindTheater';
import MapScreen from './Choi/MapScreen';

import AIRecommend from './Park/AIRecommend';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Stack.Navigator initialRouteName="BottomTabMenu">
                    <Stack.Screen 
                        name="BottomTabMenu" 
                        component={BottomTabMenu} 
                        options={{ headerShown: false }} 
                    />
                    {/* <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> */}
                    {/* <Stack.Screen name="ReviewList" component={ReviewList} options={{title: "리뷰 목록", headerShown: false}}/> */}
                    {/* <Stack.Screen name="OTTScreen" component={OTTScreen} options={{title: "OTT", headerTitleStyle:{fontWeight: 'bold'}}}/> */}
                    <Stack.Screen name="OTTListScreen" component={OTTListScreen}  />
                    {/* <Stack.Screen name="MovieScreen" component={MovieScreen} options={{title: "영화", headerTitleStyle:{fontWeight: 'bold'}}}/> */}
                    <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
                    <Stack.Screen name="FindTheater" component={FindTheater} options={{title: "영화관 찾기", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="MapScreen" component={MapScreen}/>
                    <Stack.Screen name="AIRecommend" component={AIRecommend} options={{title: "AI추천", headerTitleStyle:{fontWeight: 'bold'}}}/>

                    <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
