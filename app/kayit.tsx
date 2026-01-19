import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const KayitOl = () => {
  const [kullanici_adi, setKullanici_adi] = useState("");
  const [sifre, setSifre] = useState("");
  const router = useRouter();

  const YeniKayıt = async () => {
    if (!kullanici_adi || !sifre) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
      return;
    }
    try {
      const istekat = await fetch('http://192.168.0.19:3000/kayit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kullanici_adi: kullanici_adi,
          sifre: sifre
        })
      });

      const sonuc = await istekat.text();
      
      if (sonuc === "Kayıt Başarılı") { 
        Alert.alert("Başarılı", "Hesabınız Oluşturuldu");
        router.push("/");
      } else {
        Alert.alert("Hata", sonuc);
      }
    } catch (error) {
      Alert.alert("Hata", "Sunucuya Bağlanamadı");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.mainContainer}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        <View style={styles.headerArea}>
          <Text style={styles.welcomeText}>Yeni Kayıt</Text>
          <Text style={styles.subText}>Bilgilerini girerek aramıza katıl kanka.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kullanıcı Adı</Text>
            <TextInput 
              style={styles.input}
              placeholder="Kullanıcı Adı"
              value={kullanici_adi} 
              onChangeText={setKullanici_adi} 
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput 
              style={styles.input}
              placeholder="Şifre"
              secureTextEntry={true}
              value={sifre} 
              onChangeText={setSifre} 
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={YeniKayıt}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()} style={styles.footer}>
          <Text style={styles.footerText}>Zaten hesabın var mı? <Text style={styles.linkText}>Giriş Yap</Text></Text>
        </TouchableOpacity>
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
  },
  headerArea: {
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2D3436',
  },
  subText: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 20,
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
  button: {
    backgroundColor: '#4A90E2',
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#636E72',
    fontSize: 15,
  },
  linkText: {
    color: '#4A90E2',
    fontWeight: '700',
  },
});

export default KayitOl;