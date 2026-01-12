import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';

export default function Profile({ navigation }: any) {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLight = theme === 'light';
    const bgColor = isLight ? '#fff' : '#222';
    const textColor = isLight ? '#000' : '#fff';
    const totalItems = useSelector((state: RootState) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0));
    const subtotal = useSelector((state: RootState) => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
            <Text style={{ color: textColor, fontSize: 18, fontWeight: 'bold' }}>Profile</Text>
            <Text style={{ color: textColor, marginVertical: 4 }}>Total items: {totalItems}</Text>
            <Text style={{ color: textColor, marginBottom: 8 }}>Subtotal: ${subtotal.toFixed(2)}</Text>
            <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
            <Button title="Toggle Theme" onPress={() => dispatch(toggleTheme())} />
        </View>

    );
}
