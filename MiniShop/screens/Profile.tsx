import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import { toggleFavorite } from '../store/favoritesSlice';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation<any>();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const isLight = theme === 'light';
    const bgColor = isLight ? '#fff' : '#222';
    const textColor = isLight ? '#000' : '#fff';
    const cardColor = isLight ? '#f2f2f2' : '#333';
    const borderColor = isLight ? '#ddd' : '#444';
    const buttonColor = isLight ? '#007AFF' : '#0A84FF';

    const totalItems = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
    );
    const subtotal = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    );

    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    // Hard-coded profile info
    const profilePhoto = 'https://i.pravatar.cc/150?img=12';
    const profileName = 'John Doe';
    const profileEmail = 'johndoe@example.com';

    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16, backgroundColor: bgColor, paddingBottom: 40 }}
            ListHeaderComponent={() => (
                <View style={{ marginBottom: 24, alignItems: 'center' }}>
                    {/* Profile Info */}
                    <Image
                        source={{ uri: profilePhoto }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 12 }}
                    />
                    <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>{profileName}</Text>
                    <Text style={{ color: textColor, marginBottom: 16 }}>{profileEmail}</Text>

                    {/* Cart summary */}
                    <Text style={{ color: textColor, marginBottom: 4 }}>Total items: {totalItems}</Text>
                    <Text style={{ color: textColor, marginBottom: 12 }}>Subtotal: € {subtotal.toFixed(2)}</Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: buttonColor,
                            paddingVertical: 10,
                            borderRadius: 10,
                            marginBottom: 16,
                            width: 200
                        }}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Go to Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: isLight ? '#28A745' : '#2ECC71',
                            paddingVertical: 10,
                            borderRadius: 10,
                            marginBottom: 16,
                            width: 200
                        }}
                        onPress={() => dispatch(toggleTheme())}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Toggle Theme</Text>
                    </TouchableOpacity>

                    <Text style={{ color: textColor, fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
                        Favorites
                    </Text>
                </View>
            )}

            renderItem={({ item }) => (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: cardColor,
                        borderRadius: 12,
                        marginBottom: 10,
                        padding: 12,
                        borderWidth: 1,
                        borderColor,
                    }}
                >
                    {item.image && (
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
                            resizeMode="cover"
                        />
                    )}
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: textColor, fontWeight: '600' }}>{item.title}</Text>
                        <Text style={{ color: textColor, marginTop: 4 }}>€ {item.price.toFixed(2)}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('HomeTab', {
                                    screen: 'ProductDetail',
                                    params: { id: item.id, from: 'Profile' },
                                })
                            }
                            style={{
                                backgroundColor: buttonColor,
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                borderRadius: 8,
                                marginTop: 6,
                                alignSelf: 'flex-start'
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: '600' }}>View Details</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))} style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 24, color: '#FF3B30' }}>❤️</Text>
                    </TouchableOpacity>
                </View>
            )}
            ListEmptyComponent={() => (
                <Text style={{ color: textColor, textAlign: 'center', marginTop: 16 }}>No favorites yet.</Text>
            )}
        />
    );
}
