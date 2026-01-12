import { View, Text, Button, ActivityIndicator, FlatList, Image } from 'react-native';
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
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:bgColor }}>
      <Text style={{ color:textColor }}>Error fetching products</Text>
    </View>
  );
  if (!data || data.length === 0) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:bgColor }}>
      <Text style={{ color:textColor }}>No products found</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ backgroundColor: bgColor, paddingVertical: 8 }}
      renderItem={({ item }) => (
        <View style={{
          marginHorizontal: 16,
          marginVertical: 8,
          backgroundColor: isLight ? '#f9f9f9' : '#333',
          borderRadius: 12,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 3,
        }}>
          {item.images[0] && (
            <Image source={{ uri: item.images[0] }} style={{ width:'100%', height:150 }} resizeMode="cover" />
          )}
          <View style={{ padding: 12 }}>
            <Text style={{ color:textColor, fontWeight:'bold', fontSize:16 }}>{item.title}</Text>
            <Text style={{ color:textColor, marginVertical:4 }}>${item.price}</Text>
            <Button
              title="View Details"
              color={isLight ? undefined : '#bbb'}
              onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            />
          </View>
        </View>
      )}
    />
  );
}
