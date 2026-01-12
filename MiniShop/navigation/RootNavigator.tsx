import { Theme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type RootTabParamList = {
  HomeTab: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  const themeMode = useSelector((state: RootState) => state.theme.theme);
  const isLight = themeMode === 'light';

  const navTheme: Theme = {
    dark: !isLight,
    colors: {
      primary: isLight ? '#007AFF' : '#0A84FF',
      background: isLight ? '#fff' : '#222',
      card: isLight ? '#f9f9f9' : '#333',
      text: isLight ? '#000' : '#fff',
      border: isLight ? '#ccc' : '#555',
      notification: '#FF453A',
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '900' },
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: navTheme.colors.card },
          headerTintColor: navTheme.colors.text,
          tabBarStyle: { backgroundColor: navTheme.colors.card },
          tabBarActiveTintColor: navTheme.colors.primary,
          tabBarInactiveTintColor: isLight ? '#555' : '#aaa',
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
