import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/Home/ProductList';
import ProductDetail from '../screens/Home/ProductDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export type HomeStackParamList = {
  ProductList: undefined;
  ProductDetail: { id: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isLight = theme === 'light';

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isLight ? '#f9f9f9' : '#333' },
        headerTintColor: isLight ? '#000' : '#fff',
      }}
    >
      <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
