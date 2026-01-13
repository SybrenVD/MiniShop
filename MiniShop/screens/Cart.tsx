import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../store/cartSlice';

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const isLight = theme === 'light';
  const bgColor = isLight ? '#fff' : '#111';
  const textColor = isLight ? '#000' : '#fff';
  const cardColor = isLight ? '#f2f2f2' : '#222';
  const borderColor = isLight ? '#ddd' : '#444';

  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor
      }}>
        <Text style={{ color: textColor, fontSize: 16 }}>🛒 Cart is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ backgroundColor: bgColor, paddingVertical: 12 }}
      renderItem={({ item }) => (
        <View style={{
          flexDirection: 'row',
          padding: 12,
          marginHorizontal: 16,
          marginBottom: 10,
          borderRadius: 10,
          backgroundColor: cardColor,
          borderWidth: 1,
          borderColor,
          alignItems: 'center'
        }}>
          {/* Afbeelding */}
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 12,
                backgroundColor: '#ccc'
              }}
            />
          )}

          {/* Product info + quantity */}
          <View style={{ flex: 1 }}>
            <Text style={{ color: textColor, fontWeight: '600', fontSize: 16 }}>
              {item.title}
            </Text>
            <Text style={{ color: textColor, opacity: 0.7, marginVertical: 4 }}>
              € {item.price.toFixed(2)} × {item.quantity}
            </Text>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
              <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
                <Text style={{ color: textColor, fontSize: 18 }}>−</Text>
              </TouchableOpacity>
              <Text style={{ color: textColor }}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
                <Text style={{ color: textColor, fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remove knop */}
          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Text style={{ fontSize: 20, color: isLight ? '#d00' : '#ff5555' }}>🗑</Text>
          </TouchableOpacity>
        </View>
      )}

      ListFooterComponent={() => (
        <View style={{ padding: 16, borderTopWidth: 1, borderColor }}>
          <Text style={{
            color: textColor,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12
          }}>
            Subtotal: € {items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: isLight ? '#007AFF' : '#0A84FF',
              paddingVertical: 12,
              borderRadius: 10
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
