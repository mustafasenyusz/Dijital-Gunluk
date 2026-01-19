const express = require('express');
const { Pool } = require('pg'); // "Poll" yerine "Pool" düzeltildi
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ 
  user: "postgres",
  host: "localhost",
  database: "gunlukapp",
  password: "1",
  port: 5432, 
});

app.post("/giris", async (req, res) => {
  const { kullanici_adi, sifre } = req.body;
  try {
    const sorgusonucu = await pool.query(
      'SELECT * FROM kullanicilar where kullanici_adi=$1 AND sifre=$2', 
      [kullanici_adi, sifre]
    );

    if (sorgusonucu.rows.length > 0) { 
      // 1. Veritabanından gelen satırı bir değişkene alalım
      const kullanici = sorgusonucu.rows[0]; 

      console.log("Kullanıcı Bulundu:", kullanici.kullanici_adi);

      // 2. BURASI DEĞİŞTİ: res.send yerine res.json ile paket gönderiyoruz
      res.json({
        mesaj: "Kullanıcı Bulundu",
        id: kullanici.id // Veritabanındaki 'id' sütunundan gelen veri
      });

    } else {
      console.log("kullanıcı Bulunamadı");
      res.status(401).send("kullanıcı Bulunamadı"); 
    }
  } catch (err) { 
    console.log("bağlantı hatası");
    res.status(500).send("bağlantı hatası");
  }
});

app.post("/kayit", async (req, res) => { // 1. Kapı isminin başına "/" koyduk
  const { kullanici_adi, sifre } = req.body;
  
  try {
    // 2. pool.query küçük harf olacak ve id'yi çıkardık (otomatik artıyor çünkü)
    const sorgusonucu = await pool.query(
      'INSERT INTO kullanicilar(kullanici_adi, sifre) VALUES($1, $2)', 
      [kullanici_adi, sifre]
    );

    // 3. Parantezleri düzelttik. console.log ve res.send ayrı ayrı satırlar.
    console.log("Kayıt Başarılı");
    res.send("Kayıt Başarılı");

  } catch (err) {
    // 4. Hata olursa dükkan kapanmasın diye catch bloğu şart
    console.log("Hata oluştu:", err.message);
    res.status(500).send("Kayıt başarısız oldu");
  }
});
// Günlük ekleme kapısı (Endpoint)
app.post("/gunluk-ekle", async (req, res) => {
  const { kullanici_id, baslik, icerik } = req.body; // Telefondan gelen verileri yakaladık

  try {
    const yeniGunluk = await pool.query(
      'INSERT INTO gunlukler (kullanici_id, baslik, icerik) VALUES ($1, $2, $3) RETURNING *',
      [kullanici_id, baslik, icerik]
    );

    console.log("Yeni günlük kaydedildi!");
    res.status(200).send("Günlük Başarıyla Kaydedildi");
  } catch (err) {
    console.error("Hata oluştu:", err.message);
    res.status(500).send("Sunucu hatası: Günlük kaydedilemedi.");
  }
});
app.get("/gunlukleri-getir/:kullanici_id", async (req, res) => {
    const { kullanici_id } = req.params;
    try {
        const gunlukler = await pool.query(
            'SELECT * FROM gunlukler WHERE kullanici_id = $1 ORDER BY id DESC',
            [kullanici_id]
        );
        res.json(gunlukler.rows);
    } catch (err) {
        res.status(500).send("Veriler çekilemedi.");
    }
});
app.listen(3000, () => {
  console.log("sunucu çalışıyor");
});