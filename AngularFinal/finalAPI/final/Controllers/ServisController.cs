using final.Models;
using final.ViewModel;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace final.Controllers
{
    
    public class ServisController : ApiController
    {
        FinalEntities db = new FinalEntities();
        SonucModel sonuc = new SonucModel();

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatSoruSay = x.Soru.Count
            }).ToList();

            return liste;

        }
        
        [HttpGet]
        [Route("api/kategoribyid/{katId}")]

        public KategoriModel KategoriById (int katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.KategoriId == katId).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatSoruSay = x.Soru.Count
            }).SingleOrDefault();
            return kayit;
        }


        [HttpGet]
        [Route("api/kategorilistesoneklenenler/{s}")]

        public List<KategoriModel> KategoriListeSonEklenenler(int s)
        {
            List<KategoriModel> liste = db.Kategori.OrderByDescending(o => o.KategoriId).Take(s).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatSoruSay = x.Soru.Count

            }).ToList();

            return liste;
        }


        [HttpPost]
        [Route("api/kategoriekle")]

        public SonucModel KategoriEkle (KategoriModel model)
        {
            if (db.Kategori.Count(sonuc => sonuc.KategoriAdi == model.KategoriAdi)>0 )
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.KategoriAdi = model.KategoriAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi"; 

            return sonuc;
        }


        [HttpPut]
        [Route("api/kategoriduzenle")]
        
        public SonucModel KategoriDuzenle (KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.KategoriAdi = model.KategoriAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]

        public SonucModel KategoriSil (int katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == katId).FirstOrDefault();
            if(kayit== null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Soru.Count(s=> s.SoruKategoriId == katId)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerine Kayıtlı Soru Olan Bu Kategori Silinemez!";
                return sonuc;
            }
            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }



        #endregion

        #region Etiket

        [HttpGet]
        [Route("api/etiketliste")]

        public List<EtiketModel> EtiketListe()
        {
            List<EtiketModel> liste = db.Etiket.Select(x => new EtiketModel()
            {
                EtiketId = x.EtiketId,
                EtiketAdi = x.EtiketAdi
            }).ToList();

            return liste;

        }

        [HttpGet]
        [Route("api/etiketbyid/{etiketId}")]

        public EtiketModel EtiketById(int etiketId)
        {
            EtiketModel kayit = db.Etiket.Where(s => s.EtiketId == etiketId).Select(x => new EtiketModel()
            {

                EtiketId = x.EtiketId,
                EtiketAdi = x.EtiketAdi
            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/etiketlistesoneklenenler/{s}")]

        public List<EtiketModel> EtiketListeSonEklenenler(int s)
        {
            List<EtiketModel> liste = db.Etiket.OrderByDescending(o => o.EtiketId).Take(s).Select(x => new EtiketModel()
            {
                EtiketAdi = x.EtiketAdi,
                 EtiketId = x.EtiketId

            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route("api/etiketekle")]

        public SonucModel EtiketEkle(EtiketModel model)
        {
            if (db.Etiket.Count(sonuc => sonuc.EtiketAdi == model.EtiketAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Etiket Adı Kayıtlıdır!";
                return sonuc;
            }
            Etiket yeni = new Etiket();
            yeni.EtiketAdi = model.EtiketAdi;
            db.Etiket.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Etiket Eklendi";

            return sonuc;
        }


        [HttpPut]
        [Route("api/etiketduzenle")]

        public SonucModel EtiketDuzenle(EtiketModel model)
        {
            Etiket kayit = db.Etiket.Where(s => s.EtiketId == model.EtiketId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.EtiketAdi = model.EtiketAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Etiket Güncellendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/etiketsil/{etiketId}")]

        public SonucModel EtiketSil(int etiketId)
        {
            Etiket kayit = db.Etiket.Where(s => s.EtiketId == etiketId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Soru.Count(s => s.SoruEtiketId == etiketId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerine Kayıtlı Soru Olan Bu Etiket Silinemez!";
                return sonuc;
            }
            db.Etiket.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Etiket Silindi";
            return sonuc;
        }
        #endregion

        #region Soru

        [HttpGet]
        [Route ("api/soruliste")]

        public List<SoruModel> SoruListe()
        {
            List<SoruModel> liste = db.Soru.Select(x => new SoruModel()
            {
                SoruId =x. SoruId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                SoruKategoriId = x.SoruKategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Goruntulenme = x.Goruntulenme,
                Tarih=x.Tarih,
                SoruUyeId= x.SoruUyeId,
                UyeKadi=x.Uye.KullaniciAdi,
                SoruEtiketId=x.SoruEtiketId

            }).ToList();

            return liste;
        }


        [HttpGet]
        [Route("api/sorulistebykatid/{katId}")]

        public List<SoruModel> SoruListeByKatId(int katId)
        {
            List<SoruModel> liste = db.Soru.Where(s=>s.SoruKategoriId==katId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                SoruKategoriId = x.SoruKategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Goruntulenme = x.Goruntulenme,
                Tarih = x.Tarih,
                SoruUyeId = x.SoruUyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                SoruEtiketId = x.SoruEtiketId,
                EtiketAdi= x.Etiket.EtiketAdi
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/sorulistebyuyeid/{uyeId}")]

        public List<SoruModel> SoruListeByUyeId(int uyeId)
        {
            List<SoruModel> liste = db.Soru.Where(s => s.SoruUyeId == uyeId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                SoruKategoriId = x.SoruKategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Goruntulenme = x.Goruntulenme,
                Tarih = x.Tarih,
                SoruUyeId = x.SoruUyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                SoruEtiketId = x.SoruEtiketId

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/sorubyid/{soruId}")]

        public SoruModel SoruById (int soruId)
        {
            SoruModel kayit = db.Soru.Where(s=>s.SoruId==soruId).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                SoruKategoriId = x.SoruKategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Goruntulenme = x.Goruntulenme,
                Tarih = x.Tarih,
                SoruUyeId = x.SoruUyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                SoruEtiketId = x.SoruEtiketId
            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/sorulistesoneklenenler/{s}")]

        public List<SoruModel> SoruListeSonEklenenler(int s)
        {
            List<SoruModel> liste = db.Soru.OrderByDescending(o=>o.SoruId).Take(s).Select(x => new SoruModel()
            {
                SoruId = x.SoruId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                SoruKategoriId = x.SoruKategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Goruntulenme = x.Goruntulenme,
                Tarih = x.Tarih,
                SoruUyeId = x.SoruUyeId,
                UyeKadi = x.Uye.KullaniciAdi,
                SoruEtiketId = x.SoruEtiketId,
                EtiketAdi = x.Etiket.EtiketAdi,

            }).ToList();

            return liste;
        }



        [HttpPost]
        [Route("api/soruekle")]

        public SonucModel SoruEkle (SoruModel model)
        {
            if(db.Soru.Count (s=>s.Baslik == model.Baslik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Başlığı Kayıtlıdır!";
                return sonuc;
            }

            Soru yeni = new Soru();
            yeni.Baslik = model.Baslik;
            yeni.Icerik = model.Icerik;
            yeni.Tarih = model.Tarih;
            yeni.Goruntulenme = model.Goruntulenme;
            yeni.SoruKategoriId = model.SoruKategoriId;
            yeni.SoruUyeId = model.SoruUyeId;
            yeni.SoruEtiketId = model.SoruEtiketId;
    
            db.Soru.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi.";
            return sonuc;
        }


        [HttpPut]
        [Route("api/soruduzenle")]

        public SonucModel SoruDuzenle(SoruModel model)
        {
            Soru kayit = db.Soru.Where(s => s.SoruId == model.SoruId).SingleOrDefault();
            if (kayit== null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            Soru yeni = new Soru();
            kayit.Baslik = model.Baslik;
            kayit.Icerik = model.Icerik;
            kayit.Tarih = model.Tarih;
            kayit.Goruntulenme = model.Goruntulenme;
            kayit.SoruKategoriId = model.SoruKategoriId;
            kayit.SoruUyeId = model.SoruUyeId;
            kayit.SoruEtiketId = model.SoruEtiketId;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi.";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/sorusil/{soruId}")]

        public SonucModel SoruSil (int soruId)
        {
            Soru kayit = db.Soru.Where(s => s.SoruId == soruId).SingleOrDefault();
            if(kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulanamadı!";
                return sonuc;
            }

            if (db.Cevap.Count(s=>s.CevapSoruId==soruId)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Cevap Kayıtlı Olan Bu Soru Silinemez!";
                return sonuc;
            }

            db.Soru.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";
            return sonuc;
        }

        #endregion


        #region Uye

        [HttpGet]
        [Route("api/uyeliste")]

        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                UyeId=x.UyeId,
                AdSoyad=x.AdSoyad,
                Email=x.Email,
                KullaniciAdi=x.KullaniciAdi,
                UyeFoto=x.UyeFoto,
                Sifre=x.Sifre,
                UyeAdmin=x.UyeAdmin
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]

        public UyeModel UyeById (int uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.UyeId == uyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                UyeFoto = x.UyeFoto,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin
            }).SingleOrDefault();

            return kayit;
        }

        [HttpGet]
        [Route("api/uyelistesoneklenenler/{s}")]

        public List<UyeModel> UyeListeSonEklenenler(int s)
        {
            List<UyeModel> liste = db.Uye.OrderByDescending(o => o.UyeId).Take(s).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                UyeFoto = x.UyeFoto,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin

            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route ("api/uyeekle")]

        public SonucModel UyeEkle (UyeModel model)
        {
            if(db.Uye.Count(s=>s.KullaniciAdi==model.KullaniciAdi|| s.Email == model.Email)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Adresi Kayıtlıdır!";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.AdSoyad = model.AdSoyad;
            yeni.Email = model.Email;
            yeni.KullaniciAdi = model.KullaniciAdi;
            yeni.UyeFoto = model.UyeFoto;
            yeni.Sifre = model.Sifre;
            yeni.UyeAdmin = model.UyeAdmin;

            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi.";
            return sonuc;
        }

        [HttpPut]
        [Route ("api/uyeduzenle")]

        public SonucModel UyeDuzenle (UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if(kayit==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.AdSoyad = model.AdSoyad;
            kayit.Email = model.Email;
            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.UyeFoto = model.UyeFoto;
            kayit.Sifre = model.Sifre;
            kayit.UyeAdmin = model.UyeAdmin;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";

            return sonuc;
        }

        [HttpPost]
        [Route("api/uyefotoguncelle")]
        public SonucModel UyeFotoGuncelle(UyeFotoModel model)
        {
            Uye uye = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault();
            if(uye==null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (uye.UyeFoto != "profil.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/"+ uye.UyeFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.FotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = uye.UyeId + model.FotoUzanti.Replace("image/",".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));

            }
            uye.UyeFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Güncellendi";
            return sonuc;
        }


        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]

        public SonucModel UyeSil( int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == uyeId).SingleOrDefault();
            if (kayit== null)
            {
                sonuc.islem=false;
                sonuc.mesaj = "Kayıt Bulunama!";
                return sonuc;
            }

            if (db.Soru.Count(s=>s.SoruUyeId==uyeId)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Soru Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            if (db.Cevap.Count(s => s.CevapUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Cevap Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi.";
            return sonuc;
        }

        #endregion


        #region Cevap

        [HttpGet]
        [Route ("api/cevapliste")]

        public List<CevapModel> CevapListe ()
        {
            List<CevapModel> liste = db.Cevap.Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                CevapSoruId = x.CevapSoruId,
                CevapUyeId = x.CevapUyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                SoruBaslik = x.Soru.Baslik
            }).ToList();

            return liste;
        }


        [HttpGet]
        [Route("api/cevaplistebyuyeid/{uyeId}")]

        public List<CevapModel> CevapListeByUyeId(int uyeId)
        {
            List<CevapModel> liste = db.Cevap.Where(s=> s.CevapUyeId==uyeId).Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                CevapSoruId = x.CevapSoruId,
                CevapUyeId = x.CevapUyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                SoruBaslik = x.Soru.Baslik
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/cevaplistebysoruid/{soruId}")]

        public List<CevapModel> CevapListeBySoruId(int soruId)
        {
            List<CevapModel> liste = db.Cevap.Where(s => s.CevapSoruId == soruId).Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                CevapSoruId = x.CevapSoruId,
                CevapUyeId = x.CevapUyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                SoruBaslik = x.Soru.Baslik
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/cevaplistesoneklenenler/{s}")]

        public List<CevapModel> CevapListeSonEklenenler(int s)
        {
            List<CevapModel> liste = db.Cevap.OrderByDescending(o=>o.CevapSoruId).Take(s).Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                CevapSoruId = x.CevapSoruId,
                CevapUyeId = x.CevapUyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                SoruBaslik = x.Soru.Baslik
            }).ToList();

            return liste;
        }


        [HttpGet]
        [Route("api/cevapbyid/{cevapId}")]

        public CevapModel CevapById (int cevapId)
        {
            CevapModel kayit = db.Cevap.Where(s => s.CevapId == cevapId).Select(x => new CevapModel()
            {
                CevapId = x.CevapId,
                CevapIcerik = x.CevapIcerik,
                CevapSoruId = x.CevapSoruId,
                CevapUyeId = x.CevapUyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                SoruBaslik = x.Soru.Baslik,

            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route ("api/cevapekle")]

        public SonucModel CevapEkle (CevapModel model)
        {
            if (db.Cevap.Count(s=>s.CevapUyeId==model.CevapUyeId && s.CevapSoruId == model.CevapSoruId && s.CevapIcerik==model.CevapIcerik)>0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Makaleye Aynı Yorumu Yapamaz!";
                return sonuc;
            }

            Cevap yeni = new Cevap();
            yeni.CevapId = model.CevapId;
            yeni.CevapIcerik = model.CevapIcerik;
            yeni.CevapSoruId = model.CevapSoruId;
            yeni.CevapUyeId = model.CevapUyeId;
            yeni.Tarih = model.Tarih;

            db.Cevap.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cevap Eklendi.";

            return sonuc;
        }

        [HttpPut]
        [Route("api/cevapduzenle")]

        public SonucModel CevapDuzenle(CevapModel model)
        {
            Cevap kayit = db.Cevap.Where(s => s.CevapId == model.CevapId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }


            kayit.CevapId = model.CevapId;
            kayit.CevapIcerik = model.CevapIcerik;
            kayit.CevapSoruId = model.CevapSoruId;
            kayit.CevapUyeId = model.CevapUyeId;
            kayit.Tarih = model.Tarih;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cevap Düzenlendi.";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/cevapsil/{cevapId}")]

        public SonucModel CevapSil (int cevapId)
        {
            Cevap kayit = db.Cevap.Where(s => s.CevapId == cevapId).SingleOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Cevap.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Silindi.";
            return sonuc;
        }

        #endregion
    }

}
