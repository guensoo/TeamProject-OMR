import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

//공통
import BottomTabMenu from './All/BottomTabMenu';

//메인
import Login from './Heo/pages/Login';
import Signup from './Heo/pages/Signup';
import FindId from './Heo/pages/FindId';
import FindPassword from './Heo/pages/FindPassword';

//

// 박세현
import ReviewDetail from './Park/ReviewDetail';
import InfoDetail from './Park/InfoDetail';

//
import MovieListScreen from './Choi/MovieListScreen';
import OTTListScreen from './Choi/OTTListScreen';
import FindTheater from './Choi/components/FindTheater';
import MapScreen from './Choi/MapScreen';
import SearchList from './Choi/SearchList';

import AIRecommend from './Park/AIRecommend';
import { ReviewWrite }from './Kim/component/ReviewWrite';
import { SupportMain } from './Kim/supportCenter/SupportMain';
import { FAQ } from './Kim/supportCenter/FAQ';
import { QnA } from './Kim/supportCenter/QnA';
import { Notice } from './Kim/supportCenter/Notice';
import { SupportWrapper } from './Kim/supportCenter/SupportWrapper';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Stack.Navigator initialRouteName="BottomTabMenu">
                    <Stack.Screen name="BottomTabMenu" component={BottomTabMenu} options={{ headerShown: false }} />

                    <Stack.Screen name="Login" component={Login} options={{title: "로그인"}} />
                    <Stack.Screen name="OTTListScreen" component={OTTListScreen} options={{headerShown:false}}/>
                    <Stack.Screen name="MovieListScreen" component={MovieListScreen} options={{headerShown:false}}/>
                    <Stack.Screen name="FindTheater" component={FindTheater} options={{title: "영화관 찾기", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="MapScreen" component={MapScreen}/>
                    <Stack.Screen name="AIRecommend" component={AIRecommend} options={{title: "AI추천", headerTitleStyle:{fontWeight: 'bold'}}}/>
                    <Stack.Screen name="SearchList" component={SearchList} options={{headerShown:false}}/>

                    <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
                    <Stack.Screen name="ReviewWrite" component={ReviewWrite} options={{headerShown:false}}/>
                    <Stack.Screen name="Support" component={SupportWrapper} options={{headerShown:false}}/>

                    <Stack.Screen name="InfoDetail" component={InfoDetail} />

                    <Stack.Screen name="Signup" component={Signup} options={{title: '회원가입'}}/>
                    <Stack.Screen name="FindId" component={FindId} options={{title: '아이디찾기'}}/>
                    <Stack.Screen name="FindPassword" component={FindPassword} options={{title: '비밀번호찾기'}}/>
                    
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
