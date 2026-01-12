import { View, Text, Button, Image, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProductById, Product } from '../../services/products';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../store/cartSlice';

export default function ProductDetail({ route }: any) {
  const { id } = route.params;
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isLight = theme === 'light';
  const bgColor = isLight ? '#fff' : '#222';
  const textColor = isLight ? '#000' : '#fff';
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <Text style={{ flex:1, textAlign:'center' }}>Loading...</Text>;
  if (isError || !data) return <Text style={{ color:textColor }}>Error loading product</Text>;

  return (
    <ScrollView style={{ flex:1, backgroundColor:bgColor, padding:16 }}>
      {data.images[0] && (
        <Image source={{ uri: data.images[0] }} style={{ width:'100%', height:250, borderRadius:12 }} resizeMode="cover" />
      )}
      <Text style={{ color:textColor, fontWeight:'bold', fontSize:20, marginVertical:8 }}>{data.title}</Text>
      <Text style={{ color:textColor, fontSize:18, marginBottom:8 }}>${data.price}</Text>
      <Text style={{ color:textColor, marginBottom:16 }}>{data.description}</Text>
      <Button title="Add to Cart" onPress={() => dispatch(addToCart({ id:data.id, title:data.title, price:data.price }))} />
    </ScrollView>
  );
}
