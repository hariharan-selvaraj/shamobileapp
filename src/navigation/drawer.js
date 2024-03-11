import { Image, Dimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import home from '../components/page/HomePage/home';
import input from '../../input';
import Dashboard from '../components/page/Dashboard/Dashboard';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Drawer = createDrawerNavigator();
const imageUrl = 'https://shatechnosolutions.com/AppsFiles/Logo/website_logo_transparent_background.png';

// Custom Drawer Content Component
function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Image
                source={{ uri: imageUrl }}
                style={{ width: Width / 2, height: Height / 5, resizeMode: 'contain', marginLeft: 20 }}
            />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export function HomeDrawer() {
    return (
        <Drawer.Navigator initialRouteName="home"
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    // backgroundColor: 'lightblue'
                },
                headerShown: false
            }}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            {/* <Drawer.Screen name="Home" component={home} /> */}
            {/* <Drawer.Screen name="input" component={input} /> */}
            {/* Add more screens for other options in the drawer menu */}
        </Drawer.Navigator>
    );
}