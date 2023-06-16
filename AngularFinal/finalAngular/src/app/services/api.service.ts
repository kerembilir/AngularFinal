import { Uye } from './../models/Uye';
import { Soru } from '../models/Soru';
import { Kategori } from './../models/Kategori';
import { Cevap } from '../models/Cevap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';
import { Etiket } from '../models/Etiket';
import { UyeFoto } from '../models/UyeFoto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:50036/api/";
  siteUrl = "http://localhost:50036/";
  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get<Kategori[]>(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get<Kategori>(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriListeSonEklenenler(s: number) {
    return this.http.get<Kategori[]>(this.apiUrl + "/kategorilistesoneklenenler/" + s);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post<Sonuc>(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put<Sonuc>(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/kategorisil/" + katId);
  }


  EtiketListe() {
    return this.http.get<Etiket[]>(this.apiUrl + "/etiketliste");
  }
  EtiketById(etiketId: number) {
    return this.http.get<Etiket>(this.apiUrl + "/etiketbyid/" + etiketId);
  }
  EtiketListeSonEklenenler(s: number) {
    return this.http.get<Etiket[]>(this.apiUrl + "/etiketlistesoneklenenler/" + s);
  }
  EtiketEkle(etiket: Etiket) {
    return this.http.post<Sonuc>(this.apiUrl + "etiketekle", etiket);
  }
  EtiketDuzenle(etiket: Etiket) {
    return this.http.put<Sonuc>(this.apiUrl + "/etiketduzenle", etiket);
  }
  EtiketSil(etiketId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/etiketsil/" + etiketId);
  }



  SoruListe() {
    return this.http.get<Soru[]>(this.apiUrl + "/soruliste");
  }
  SoruListeSonEklenenler(s: number) {
    return this.http.get<Soru[]>(this.apiUrl + "/sorulistesoneklenenler/" + s);
  }
  SoruListeByKatId(katId: number) {
    return this.http.get<Soru[]>(this.apiUrl + "/sorulistebykatid/" + katId);
  }
  SoruListeByUyeId(uyeId: number) {
    return this.http.get<Soru[]>(this.apiUrl + "/sorulistebyuyeid/" + uyeId);
  }
  SoruById(soruId: number) {
    return this.http.get<Soru>(this.apiUrl + "/sorubyid/" + soruId);
  }
  SoruEkle(soru: Soru) {
    return this.http.post<Sonuc>(this.apiUrl + "/soruekle", soru);
  }
  SoruDuzenle(soru: Soru) {
    return this.http.put<Sonuc>(this.apiUrl + "/soruduzenle", soru);
  }
  SoruSil(soruId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/sorusil/" + soruId);
  }

  UyeListe() {
    return this.http.get<Uye[]>(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number) {
    return this.http.get<Uye>(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeListeSonEklenenler(s: number) {
    return this.http.get<Uye[]>(this.apiUrl + "/uyelistesoneklenenler/" + s);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeFotoGuncelle(uyefoto: UyeFoto) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyefotoguncelle", uyefoto);
  }
  UyeKayit(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/uyesil/" + uyeId);
  }

  CevapListe() {
    return this.http.get<Cevap[]>(this.apiUrl + "/cevapliste");
  }
  CevapListeByUyeId(uyeId: number) {
    return this.http.get<Cevap[]>(this.apiUrl + "/cevaplistebyuyeid/" + uyeId);
  }
  CevapListeBySoruId(soruId: number) {
    return this.http.get<Cevap[]>(this.apiUrl + "/cevaplistebysoruid/" + soruId);
  }
  CevapListeSonEklenenler(s: number) {
    return this.http.get<Cevap[]>(this.apiUrl + "/cevaplistesoneklenenler/" + s);
  }
  CevapById(cevapId: number) {
    return this.http.get(this.apiUrl + "/cevapbyid/" + cevapId);
  }
  CevapEkle(cevap: Cevap) {
    return this.http.post<Sonuc>(this.apiUrl + "/cevapekle", cevap);
  }
  CevapDuzenle(cevap: Cevap) {
    return this.http.put<Sonuc>(this.apiUrl + "/cevapduzenle", cevap);
  }
  CevapSil(cevapId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/cevapsil/" + cevapId);
  }
}