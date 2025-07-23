import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//공통
import Header from './공통/Header/Header';
import Footer from './공통/Footer/Footer';

//메인
import Home from './허민석/Home';

//
import Review from './박세현/Review';

//
import MovieScreen from './최근수/MovieScreen';
import OTTScreen from './최근수/OTTScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Header />
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Review" component={Review} />
                    <Stack.Screen name="OTTScreen" component={OTTScreen} />
                    <Stack.Screen name="MovieScreen" component={MovieScreen} />
                </Stack.Navigator>
                <Footer />
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
