import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface SozVerileri {
    q: string;
    a: string;
}

interface Gunluk {
    id: number;
    baslik: string;
    icerik: string;
}

const Anasayfa = () => {
    const router = useRouter();
    const [sozler, setSozler] = useState<SozVerileri | null>(null);
    const [gunlukler, setGunlukler] = useState<Gunluk[]>([]);
    const [yukleniyor, setYukleniyor] = useState<boolean>(true);

    const GunlukleriGetir = async () => {
        try {
            const kullaniciId = await AsyncStorage.getItem('@kullanici_id');
            const response = await fetch(`http://192.168.0.19:3000/gunlukleri-getir/${kullaniciId}`);
            const data = await response.json();
            setGunlukler(data);
        } catch (error) {
            console.error("Veri senkronizasyon hatası:", error);
        }
    };

    const SozCek = async () => {
        setYukleniyor(true);
        try {
            const istekat = await fetch("https://zenquotes.io/api/random");
            const gelencevap = await istekat.json();
            if (gelencevap && gelencevap.length > 0) {
                setSozler(gelencevap[0]);
            }
        } catch (sozhatasi) {
            console.error("İlham servisi hatası:", sozhatasi);
        } finally {
            setYukleniyor(false);
        }
    }

    useEffect(() => {
        SozCek();
        GunlukleriGetir();
    }, []);

    const renderGunluk = ({ item }: { item: Gunluk }) => (
        <TouchableOpacity 
            style={styles.gunlukKarti}
            activeOpacity={0.8}
            onPress={() => router.push({
                pathname: "/gunluk_detay",
                params: { baslik: item.baslik, icerik: item.icerik }
            })}
        >
            <View style={styles.gunlukSol}>
                <Ionicons name="journal-outline" size={20} color="#4A90E2" />
                <Text style={styles.gunlukBaslik} numberOfLines={1}>{item.baslik}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.anaKonteyner}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.ustCubuk}>
                <View>
                    <Text style={styles.markaIsmi}>Günlük Kayıt</Text>
                    <Text style={styles.altBaslik}>Dijital Arşiv Sistemi</Text>
                </View>
                <View style={styles.profilButonu}>
                    <Ionicons name="person" size={24} color="#4A90E2" />
                </View>
            </View>

            <FlatList
                data={gunlukler}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGunluk}
                contentContainerStyle={{ paddingBottom: 110 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.ustIcerik}>
                        <View style={styles.kart}>
                            <View style={styles.kartBaslik}>
                                <Ionicons name="sparkles" size={20} color="#FFD700" />
                                <Text style={styles.kartBaslikMetni}>GÜNÜN MOTİVASYONU</Text>
                            </View>
                            
                            {yukleniyor ? (
                                <ActivityIndicator size="large" color="#4A90E2" />
                            ) : (
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.sozMetni}>"{sozler?.q}"</Text>
                                    <Text style={styles.yazarMetni}>— {sozler?.a}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.listeBaslik}>Geçmiş Kayıtlar</Text>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.bosListe}>Henüz kayıtlı bir veri bulunmamaktadır.</Text>
                )}
            />

            <View style={styles.butonKonteyner}>
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    style={styles.anaYazButonu}
                    onPress={() => router.push("/gunluk")}
                >
                    <Ionicons name="pencil" size={22} color="#FFF" style={{marginRight: 8}} />
                    <Text style={styles.anaYazButonMetni}>Yeni Kayıt Ekle</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    anaKonteyner: { flex: 1, backgroundColor: '#F7F9FC' },
    ustCubuk: { paddingTop: 60, paddingHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 4 },
    markaIsmi: { fontSize: 26, fontWeight: '900', color: '#1A1A1A' },
    altBaslik: { fontSize: 13, color: '#4A90E2', fontWeight: '600' },
    profilButonu: { width: 50, height: 50, borderRadius: 18, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center' },
    ustIcerik: { paddingHorizontal: 25, marginTop: 20 },
    kart: { backgroundColor: '#FFF', borderRadius: 25, padding: 30, alignItems: 'center', shadowColor: "#4A90E2", shadowOpacity: 0.1, elevation: 8 },
    kartBaslik: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    kartBaslikMetni: { fontSize: 11, fontWeight: '800', color: '#B8860B', marginLeft: 5 },
    sozMetni: { fontSize: 18, fontWeight: '700', color: '#2D3436', textAlign: 'center' },
    yazarMetni: { fontSize: 14, color: '#94A3B8', marginTop: 15 },
    listeBaslik: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginTop: 30, marginBottom: 15 },
    gunlukKarti: { backgroundColor: '#FFF', marginHorizontal: 25, marginBottom: 10, padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    gunlukSol: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    gunlukBaslik: { fontSize: 16, fontWeight: '600', color: '#2D3436', marginLeft: 12 },
    bosListe: { textAlign: 'center', color: '#94A3B8', marginTop: 20, fontSize: 14 },
    butonKonteyner: { position: 'absolute', bottom: 30, left: 25, right: 25 },
    anaYazButonu: { backgroundColor: '#4A90E2', flexDirection: 'row', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 6 },
    anaYazButonMetni: { color: '#FFF', fontSize: 17, fontWeight: '700' },
});

export default Anasayfa;