import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Home from "../Heo/pages/Home";
import ReviewList from "../Kim/ReviewList";
import OTTScreen from "../Choi/OTTScreen";
import MovieScreen from "../Choi/MovieScreen";
import FindTheater from "../Choi/components/FindTheater";
import AIRecommend from "../Park/AIRecommend";
import BottomAllMenu from "./BottomAllMenu";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

const CustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.customButtonContainer}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.customButton}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const BottomTabMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    const EmptyScreen = () => null;

    return (
        <>
            <BottomTab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#000',
                    tabBarStyle: { backgroundColor: '#fff' }, // 탭바 높이 원래대로
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') iconName = 'home-outline';
                        else if (route.name === 'ReviewList') iconName = 'chatbubble-ellipses-outline';
                        else if (route.name === 'OTTScreen') iconName = 'tv-outline';
                        else if (route.name === 'MovieScreen') iconName = 'film-outline';
                        else if (route.name === 'FindTheater') iconName = 'location-outline';
                        else if (route.name === 'AIRecommend') iconName = 'flash-outline';
                        else if (route.name === 'BottomAllMenu') iconName = 'menu-outline';

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <BottomTab.Screen name="OTTScreen" component={OTTScreen} options={{ title: 'OTT' }} />
                <BottomTab.Screen name="MovieScreen" component={MovieScreen} options={{ title: '영화' }} />
                <BottomTab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarButton: (props) => <CustomButton {...props} />,
                        tabBarIcon: () => (
                            <Image
                                source={require('../assets/OMR_MainLogo.png')}
                                style={{ 
                                    width: 70, 
                                    height: 70, 
                                    borderRadius: 35, // 이미지에도 원형 radius 적용
                                    top: 7
                                }} 
                                resizeMode="cover" // 영역을 꽉 채움
                            />
                        ),
                        title: '',
                    }}
                />
                <BottomTab.Screen name="ReviewList" component={ReviewList} options={{ title: '리뷰' }} />
                <BottomTab.Screen
                    name="BottomAllMenu"
                    component={EmptyScreen} // placeholder, 안 쓰임
                    options={{
                        tabBarButton: (props) => (
                            <TouchableOpacity
                                onPress={() => setMenuVisible(true)}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Ionicons name="menu-outline" size={24} color="#000" />
                                <Text style={{ fontSize: 12, color: '#000' }}>메뉴</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </BottomTab.Navigator>

            <BottomAllMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    customButtonContainer: {
        flex: 1, // 전체 탭 영역 사용
        top: -18,  // 원래 위치로 복원
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    customButton: {
        width: 70,  // 원래 크기로 복원
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f2f0ed',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // 이미지가 원형을 벗어나지 않도록
    },
    customButtonLabel: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    }
})

export default BottomTabMenu;