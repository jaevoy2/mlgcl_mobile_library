import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";


const { height, width } = Dimensions.get('window');


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
                    <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                        
                    </View>
                </>
            )}
        </View>
    )
}