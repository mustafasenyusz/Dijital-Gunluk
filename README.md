Dijital Günlük Uygulaması

Bu proje, hem mobil uygulama geliştirmeyi hem de veritabanı yönetimini öğrenmek amacıyla geliştirilmiş bir full stack günlük tutma sistemidir. Kullanıcılar kayıt olup giriş yapabilir, günlüklerini kaydedebilir ve geçmiş kayıtlarını listeleyebilir.

Proje Özellikleri

Kullanıcı Sistemi: PostgreSQL tabanlı kayıt olma ve giriş yapma özelliği mevcuttur. Güvenli Veri Saklama: Giriş yapan kullanıcının kimlik bilgileri cihaz hafızasında tutulur ve her kullanıcı sadece kendi kayıtlarına erişebilir. Dinamik İçerik: Her açılışta ZenQuotes API aracılığıyla motivasyonel bir söz ekrana getirilir. Modern Arayüz: Expo Router ve React Native kullanılarak sade bir tasarım uygulanmıştır. Backend Yapısı: Node.js ve Express.js kullanılarak veritabanı iletişimi sağlanmıştır.

Veritabanı Yapısı

Projeyi çalıştırmak için PostgreSQL üzerinde aşağıdaki tabloların oluşturulması gerekmektedir:

Kullanicilar Tablosu CREATE TABLE kullanicilar ( id SERIAL PRIMARY KEY, kullanici_adi VARCHAR(255) UNIQUE NOT NULL, sifre VARCHAR(255) NOT NULL );

Gunlukler Tablosu CREATE TABLE gunlukler ( id SERIAL PRIMARY KEY, kullanici_id INTEGER REFERENCES kullanicilar(id), baslik VARCHAR(255), icerik TEXT, olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

Kullanılan Teknolojiler

Frontend: React Native Expo Expo Router AsyncStorage Ionicons

Backend ve Veritabanı: Node.js Express.js PostgreSQL Node-postgres (pg)

Kurulum Talimatları

Veritabanı Hazırlığı: Yukarıda belirtilen SQL komutlarını PostgreSQL veritabanınızda çalıştırın.

Backend Başlatma: Backend dizininde node index.js komutunu çalıştırın. Sunucu 3000 portunda çalışmaya başlayacaktır.

Uygulamayı Çalıştırma: Mobil uygulama dizininde npx expo start komutu ile projeyi başlatın.

Not: Bu proje eğitim amaçlı geliştirilmiştir. Backend dosyası içerisindeki PostgreSQL bağlantı bilgileri ve IP adreslerinin yerel kurulumunuza göre düzenlenmesi gerekmektedir.
