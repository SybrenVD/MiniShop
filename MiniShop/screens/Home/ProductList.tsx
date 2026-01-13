import { View, Text, Button, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProducts, Product } from '../../services/products';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStack';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductList({ navigation }: Props) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isLight = theme === 'light';
  const bgColor = isLight ? '#fff' : '#222';
  const textColor = isLight ? '#000' : '#fff';

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (isError) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
      <Text style={{ color: textColor }}>Error fetching products</Text>
    </View>
  );
  if (!data || data.length === 0) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor }}>
      <Text style={{ color: textColor }}>No products found</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: bgColor,
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 12,
      }}
      renderItem={({ item }) => (
        <View style={{
          width: '100%',
          backgroundColor: isLight ? '#f9f9f9' : '#2e2e2e',
          borderRadius: 12,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: isLight ? 0.15 : 0.4,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}>
          {item.images[0] && (
            <Image
              source={{ uri: item.images[0] }}
              style={{
                width: '100%',
                aspectRatio: 1,
                backgroundColor: '#ddd',
              }}
              resizeMode="cover"
            />
          )}

          <View style={{ padding: 12 }}>
            <Text style={{ color: textColor, fontWeight: '600', fontSize: 16 }}>
              {item.title}
            </Text>

            <Text style={{
              color: textColor,
              fontSize: 15,
              fontWeight: '600',
              marginVertical: 6,
            }}>
              € {item.price.toFixed(2)}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
              style={{
                marginTop: 8,
                backgroundColor: isLight ? '#007AFF' : '#0A84FF',
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />

  );
}
