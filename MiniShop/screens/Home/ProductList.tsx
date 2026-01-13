import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProducts, Product } from '../../services/products';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleFavorite } from '../../store/favoritesSlice';

export default function ProductList() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isLight = theme === 'light';

  const bgColor = isLight ? '#fff' : '#111';
  const cardColor = isLight ? '#f2f2f2' : '#222';
  const textColor = isLight ? '#000' : '#fff';
  const borderColor = isLight ? '#ddd' : '#444';
  const buttonColor = isLight ? '#007AFF' : '#0A84FF';

  if (isLoading) return <Text style={{ flex: 1, textAlign: 'center', color: textColor }}>Loading...</Text>;
  if (isError || !data) return <Text style={{ color: textColor, textAlign: 'center' }}>Error loading products</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ backgroundColor: bgColor, paddingVertical: 8 }}
      renderItem={({ item }) => {
        const isFavorite = favorites.some(f => f.id === item.id);

        return (
          <View style={{
            marginHorizontal: 16,
            marginVertical: 8,
            borderRadius: 12,
            backgroundColor: cardColor,
            borderWidth: 1,
            borderColor,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8
          }}>
            {item.images[0] && (
              <Image
                source={{ uri: item.images[0] }}
                style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }}
                resizeMode="cover"
              />
            )}

            <View style={{ flex: 1 }}>
              <Text style={{ color: textColor, fontWeight: '600', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: textColor, marginVertical: 4 }}>€ {item.price.toFixed(2)}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
                  style={{
                    backgroundColor: buttonColor,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>View Details</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                  onPress={() => dispatch(toggleFavorite({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.images?.[0]
                  }))}
                  style={{ padding: 4 }}
                >
                  <Text style={{ fontSize: 20, color: isFavorite ? '#FF3B30' : '#aaa' }}>
                    {isFavorite ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}
