import { View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

export default function Cart() {
    const items = useSelector((state: RootState) => state.cart.items);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLight = theme === 'light';
    const bgColor = isLight ? '#fff' : '#222';
    const textColor = isLight ? '#000' : '#fff';
    const borderColor = isLight ? '#ccc' : '#555';

    const dispatch = useDispatch();

    if (items.length === 0)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
                <Text style={{ color: textColor }}>Cart is empty</Text>
            </View>
        );

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ backgroundColor: bgColor, flexGrow: 1 }}
            renderItem={({ item }) => (
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: borderColor, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: textColor, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{ color: textColor }}>${item.price} x {item.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Button title="+" onPress={() => dispatch(incrementQuantity(item.id))} />
                        <Button title="-" onPress={() => dispatch(decrementQuantity(item.id))} />
                        <Button title="Remove" onPress={() => dispatch(removeFromCart(item.id))} />
                    </View>
                </View>

            )}
            ListFooterComponent={() => (
                <View style={{ padding: 16 }}>
                    <Text style={{ fontWeight: 'bold', color: textColor }}>
                        Subtotal: ${items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
                    </Text>
                </View>
            )}
        />
    );
}
