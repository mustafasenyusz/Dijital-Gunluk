import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const GunlukSayfası = () => {
  const [icerik, setIcerik] = useState<string>(""); 

  const YeniGunlukEkle = async () => {
    if (icerik.trim().length === 0) {
      Alert.alert("Hata", "Lütfen bir şeyler yaz kanka!");
      return;
    }

    // 1. Başlık için tarihi hazırlıyoruz (Senin formatın)
    const simdikiZaman = new Date();
    const formatliTarih = simdikiZaman.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });

    try {
      // 2. Giriş yaparken sakladığımız ID'yi hafızadan çekiyoruz
      const kullanici_id = await AsyncStorage.getItem('@kullanici_id');

      if (!kullanici_id) {
        Alert.alert("Hata", "Kullanıcı kimliği bulunamadı, lütfen tekrar giriş yap.");
        return;
      }

      // 3. Backend'deki yeni endpoint'e veriyi atıyoruz
      const response = await fetch('http://192.168.0.19:3000/gunluk-ekle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullanici_id: kullanici_id, // Hafızadan gelen ID
          baslik: formatliTarih,       // Bugünün tarihi
          icerik: icerik              // TextInput'taki yazı
        }),
      });

      const sonuc = await response.text();

      if (sonuc === "Günlük Başarıyla Kaydedildi") {
        Alert.alert("Başarılı", "Günün notu veritabanına mühürlendi! ✍️");
        setIcerik(""); // Başarılıysa içini boşalt
      } else {
        Alert.alert("Hata", "Not kaydedilemedi: " + sonuc);
      }

    } catch (error) {
      console.log("Hata:", error);
      Alert.alert("Hata", "Sunucuya bağlanılamadı kanka.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={s.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContainer}>
        
        <View style={s.ustBolum}>
          <Text style={s.anaBaslik}>Yeni Bir Anı ✍️</Text>
          <Text style={s.altMetin}>Düşüncelerini bugünle mühürle.</Text>
        </View>

        <View style={s.formKart}>
          <View style={s.inputGrup}>
            <Text style={s.etiket}>Günün Notu</Text>
            <TextInput 
              style={s.icerikInput}
              placeholder="Neler oldu, neler bitti?"
              placeholderTextColor="#A0A0A0"
              value={icerik}
              onChangeText={setIcerik}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={s.buton} 
            onPress={YeniGunlukEkle}
          >
            <Text style={s.butonYazi}>Günlüğüme Ekle</Text>
            <Ionicons name="bookmark" size={20} color="white" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  scrollContainer: { padding: 24, paddingTop: 60 },
  ustBolum: { marginBottom: 32 },
  anaBaslik: { fontSize: 32, fontWeight: '800', color: '#1A1A1A' },
  altMetin: { fontSize: 16, color: '#666', marginTop: 4 },
  formKart: { 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5
  },
  inputGrup: { marginBottom: 20 },
  etiket: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 8, marginLeft: 4 },
  icerikInput: { 
    backgroundColor: '#F8F9FA', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 16, 
    color: '#333',
    height: 200,
    borderWidth: 1,
    borderColor: '#EEE'
  },
  buton: { 
    backgroundColor: '#007AFF', 
    padding: 18, 
    borderRadius: 16, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 10,
    marginTop: 10
  },
  butonYazi: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});

export default GunlukSayfası;