import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const GirisYap = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

 const GirisKontrol = async () => {
    try {
      const response = await fetch('http://192.168.0.19:3000/giris', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullanici_adi: kullaniciAdi,
          sifre: sifre
        }),
      });

      // 1. Yazı değil JSON bekliyoruz
      const sonuc = await response.json(); 

      // 2. Kontrolü sonuc.mesaj üzerinden yapıyoruz
      if (sonuc.mesaj === "Kullanıcı Bulundu") {
        // 3. İŞTE BURASI: ID'yi hafızaya kazıyoruz
        await AsyncStorage.setItem('@kullanici_id', sonuc.id.toString());
        
        router.push("/anasayfa");
      } else {
        Alert.alert("Hata", "Kullanıcı bulunamadı veya şifre yanlış.");
      }
    } catch (error) {
      console.log("Bağlantı Hatası:", error);
      Alert.alert("Hata", "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.mainContainer}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.circleDecorator} />

        <View style={styles.headerArea}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>👋</Text>
          </View>
          <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
          <Text style={styles.subText}>Kullanıcı bilgilerinizle giriş yaparak devam edebilirsiniz.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <TextInput 
              style={styles.input}
              placeholder="Adınızı yazın"
              placeholderTextColor="#B0BCC7"
              value={kullaniciAdi}
              onChangeText={setKullaniciAdi}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#B0BCC7"
              secureTextEntry={true}
              value={sifre}
              onChangeText={setSifre}
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.85} 
            style={styles.loginButton} 
            onPress={GirisKontrol}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Hala bir hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => router.push("/kayit")}>
            <Text style={styles.signUpText}>Hemen Oluştur</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDecorator: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E1E9FF',
    zIndex: -1,
  },
  headerArea: {
    marginBottom: 35,
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  iconEmoji: {
    fontSize: 30,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2D3436',
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 5,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 25,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A90E2',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#F8FAFC',
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    color: '#2D3436',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#636E72',
    fontSize: 15,
  },
  signUpText: {
    color: '#4A90E2',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default GirisYap;