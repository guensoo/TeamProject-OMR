import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

//공통

//메인
import Home from './Heo/components/Home';

//
import ReviewList from './Kim/ReviewList';

//
import AIRecommend from './Park/AIRecommend';

//
import MovieScreen from './Choi/MovieScreen';
import OTTScreen from './Choi/OTTScreen';
import OTTListScreen from './Choi/OTTListScreen';
import FindTheater from './Choi/components/FindTheater';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                    <Stack.Screen name="ReviewList" component={ReviewList} options={{title: "리뷰 목록", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="OTTScreen" component={OTTScreen} options={{title: "OTT", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="OTTListScreen" component={OTTListScreen}/>
                    <Stack.Screen name="MovieScreen" component={MovieScreen} options={{title: "영화", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="FindTheater" component={FindTheater} options={{title: "영화관 찾기", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="AIRecommend" component={AIRecommend} options={{title: "AI추천", headerTitleStyle:{fontWeight: 'bold'}}}/>
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
