import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Heo/pages/Home';
import ReviewList from '../Kim/ReviewList';
import OTTScreen from '../Choi/OTTScreen';

const Drawer = createDrawerNavigator();

const BottomAllMenu = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerPosition: 'right',  // 오른쪽에서 열리게 설정
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="ReviewList" component={ReviewList} />
            <Drawer.Screen name="OTTScreen" component={OTTScreen} />
            {/* 원하는 다른 메뉴들도 추가 */}
        </Drawer.Navigator>

    );
}

export default BottomAllMenu;