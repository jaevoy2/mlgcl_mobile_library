import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";


const { height, width } = Dimensions.get('window');
const bookImg = require('../../assets/images/books.png')


export default function BooksView() {
    const [loading, setLoading] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading == true ? (
                <View style={{ width, height, justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator color={'#3498db'} size={'large'} />
                </View>
            ) : (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#3498db', height: 100, width, paddingTop: 40, paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 16, color: '#fff' }}>Boyet Dedal</Text>
                        <Ionicons name={'person-circle-outline'} size={28} color={'#fff'} />
                    </View>
                    <View style={{ paddingTop: 30, paddingHorizontal: 20, gap: 20 }}>
                        <View style={{ width: '100%', height: 100, padding: 20, borderRadius: 10, shadowColor: "#000", position: 'relative' }}>
                            <LinearGradient
                                colors={['#3498db', 'rgba(52, 152, 219, 0.88)',  'rgb(82, 179, 243)', '#8fccf5' ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ height: 100, position: 'absolute', width: width - 40 , bottom: 0, zIndex: -1, borderRadius: 10 }}
                            />
                            <Text style={{ color: '#fff' }}>Books</Text>
                            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <MaterialCommunityIcons name={'bookshelf'} size={35} color={'#fff'} />
                                <Text style={{ fontWeight: '900', fontSize: 28, color: '#fff' }}>500</Text>
                            </View>
                            <Ionicons name={'open-outline'} size={30} color={'#fff'} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 100, padding: 20, borderRadius: 10, shadowColor: "#000", position: 'relative' }}>
                            <LinearGradient
                                colors={['#3498db', 'rgba(52, 152, 219, 0.88)',  'rgb(82, 179, 243)', '#8fccf5' ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ height: 100, position: 'absolute', width: width - 40 , bottom: 0, zIndex: -1, borderRadius: 10 }}
                            />
                            <Text style={{ color: '#fff' }}>Borrowed Books</Text>
                            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <MaterialCommunityIcons name={'bookshelf'} size={35} color={'#fff'} />
                                <Text style={{ fontWeight: '900', fontSize: 28, color: '#fff' }}>300</Text>
                            </View>
                            <Ionicons name={'open-outline'} size={30} color={'#fff'} />
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}