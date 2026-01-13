import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';

export default function Profile({ navigation }: any) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const dispatch = useDispatch();

  const isLight = theme === 'light';
  const bgColor = isLight ? '#fff' : '#111';
  const textColor = isLight ? '#000' : '#fff';
  const cardColor = isLight ? '#f2f2f2' : '#222';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={{ alignItems: 'center', padding: 24 }}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/200' }}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
        <Text style={{
          color: textColor,
          fontSize: 20,
          fontWeight: '600',
          marginTop: 10
        }}>
          Lazy Turtle
        </Text>
        <Text style={{ color: textColor, opacity: 0.7 }}>
          lazzy@vives.be
        </Text>
      </View>

      <View style={{ marginHorizontal: 16, gap: 12 }}>
        <View style={{
          padding: 16,
          borderRadius: 10,
          backgroundColor: cardColor
        }}>
          <Text style={{ color: textColor, fontWeight: '600' }}>Items: {totalItems}</Text>
          <Text style={{ color: textColor, marginTop: 4 }}>
            Subtotal: € {subtotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: cardColor
          }}
        >
          <Text style={{ color: textColor }}>Go to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(toggleTheme())}
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: cardColor
          }}
        >
          <Text style={{ color: textColor }}>
            Toggle Theme ({theme})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 10,
            backgroundColor: isLight ? '#d9534f' : '#ff5a50',
            marginTop: 8
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
