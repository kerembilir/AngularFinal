using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final.ViewModel
{
    public class SoruModel
    {
        public int SoruId { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public System.DateTime Tarih { get; set; }
        public int Goruntulenme { get; set; }
        public int SoruKategoriId { get; set; }
        public string KategoriAdi { get; set; }
        public string UyeKadi { get; set; }
        public int SoruUyeId { get; set; }
        public int SoruEtiketId { get; set; }
        public string EtiketAdi { get; set; }
    }
}