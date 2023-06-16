using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final.ViewModel
{
    public class CevapModel
    {
        public int CevapId { get; set; }
        public string CevapIcerik { get; set; }
        public int CevapUyeId { get; set; }
        public int CevapSoruId { get; set; }
        public string KullaniciAdi { get; set; }
        public string SoruBaslik { get; set; }
        public System.DateTime Tarih { get; set; }

    }
}