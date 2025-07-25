import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {SupportProvider} from '../context/SupportContext'
import { SupportMain } from './SupportMain';
import { FAQ } from './FAQ';
import { QnA } from './QnA';
import { Notice } from './Notice';

export const SupportWrapper = () => {
    const Stack = createNativeStackNavigator();

    return(
        <SupportProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SupportMain" component={SupportMain} options={{headerShown:false}}/>
                <Stack.Screen name="FAQ" component={FAQ} options={{headerShown:false}}/>
                <Stack.Screen name="QnA" component={QnA} options={{headerShown:false}}/>
                <Stack.Screen name="Notice" component={Notice} options={{headerShown:false}}/>
            </Stack.Navigator>
        </SupportProvider>
    )
}