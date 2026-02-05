import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Image, Text, View } from "react-native";


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
                    <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
                        <View style={{ width: '100%', height: 90, padding: 10, backgroundColor: '#56b3f1', borderRadius: 10, shadowColor: "#000", 
                            shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 6, position: 'relative' }}>
                            <Text style={{ color: '#fff' }}>Books</Text>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontWeight: '900', fontSize: 20, color: '#fff' }}>Books</Text>
                            </View>
                            <Image source={bookImg} style={{ height: 110, width: 110, position: 'absolute', right: 10, top: -20 }} />
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}