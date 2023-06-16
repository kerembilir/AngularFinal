using final.Models;
using final.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final.Auth
{
    public class UyeService
    {
        FinalEntities db = new FinalEntities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email= x.Email,
                KullaniciAdi = x.KullaniciAdi,
                UyeFoto = x.UyeFoto,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin
            }).SingleOrDefault();
            return uye;
        }
    }
}