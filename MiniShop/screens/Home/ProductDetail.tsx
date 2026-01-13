import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProductById, Product } from '../../services/products';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';


export default function ProductDetail({ route }: any) {
  const { id } = route.params;
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isLight = theme === 'light';
  const bgColor = isLight ? '#fff' : '#222';
  const textColor = isLight ? '#000' : '#fff';
  const buttonColor = isLight ? '#007AFF' : '#0A84FF';

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <Text style={{ flex: 1, textAlign: 'center', color: textColor }}>Loading...</Text>;
  if (isError || !data) return <Text style={{ color: textColor, textAlign: 'center' }}>Error loading product</Text>;

  const isFavorite = favorites.some(f => f.id === data.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor, padding: 16 }}>
      {data.images[0] && (
        <Image
          source={{ uri: data.images[0] }}
          style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 12, marginBottom: 16 }}
          resizeMode="cover"
        />
      )}

      <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 22, marginBottom: 8 }}>{data.title}</Text>
      <Text style={{ color: textColor, fontSize: 20, marginBottom: 12 }}>€ {data.price.toFixed(2)}</Text>
      <Text style={{ color: textColor, marginBottom: 20 }}>{data.description}</Text>

      {/* Buttons Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        {/* Add to Cart Button */}
        <View style={{ flex: 1 }}>
          <Button
            title="Add to Cart"
            color={buttonColor}
            onPress={() =>
              dispatch(addToCart({
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.images?.[0],
              }))
            }
          />
        </View>

        {/* Spacer */}
        <View style={{ width: 16 }} />

        {/* Favorite Heart */}
        <TouchableOpacity onPress={() =>
          dispatch(toggleFavorite({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.images?.[0],
          }))
        }>
          <Text style={{ fontSize: 26, color: isFavorite ? '#FF3B30' : '#aaa' }}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
