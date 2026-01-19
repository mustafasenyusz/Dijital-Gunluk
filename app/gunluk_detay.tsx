import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const GunlukDetay = () => {
    const router = useRouter();
    const { baslik, icerik } = useLocalSearchParams();

    return (
        <View style={styles.anaKonteyner}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.ustCubuk}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    style={styles.geriButonu}
                >
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.ustBaslik}>Günlük Detayı</Text>
                <View style={{ width: 40 }} /> 
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.icerikKonteyner}
            >
                <View style={styles.detayKart}>
                    <View style={styles.tarihEtiket}>
                        <Ionicons name="calendar-outline" size={16} color="#4A90E2" />
                        <Text style={styles.tarihMetni}>{baslik}</Text>
                    </View>

                    <View style={styles.ayirici} />

                    <Text style={styles.anaMetin}>
                        {icerik}
                    </Text>
                </View>

                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.ikincilButon}
                    onPress={() => router.back()}
                >
                    <Text style={styles.ikincilButonMetni}>Listeye Dön</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    anaKonteyner: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    ustCubuk: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.05,
    },
    geriButonu: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F0F4F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ustBaslik: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    icerikKonteyner: {
        padding: 25,
    },
    detayKart: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 30,
        shadowColor: "#4A90E2",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    tarihEtiket: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    tarihMetni: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4A90E2',
        marginLeft: 8,
        textTransform: 'uppercase',
    },
    ayirici: {
        height: 1,
        backgroundColor: '#F0F4F8',
        marginBottom: 25,
    },
    anaMetin: {
        fontSize: 17,
        lineHeight: 28,
        color: '#2D3436',
        fontWeight: '500',
    },
    ikincilButon: {
        marginTop: 30,
        height: 55,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ikincilButonMetni: {
        color: '#4A90E2',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default GunlukDetay;