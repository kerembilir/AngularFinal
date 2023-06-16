import { Component, OnInit } from '@angular/core';
import { Cevap } from 'src/app/models/Cevap';
import { Etiket } from 'src/app/models/Etiket';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  kategoriler: Kategori[];
  etiketler: Etiket[];
  cevaplar: Cevap [];
  sorular: Soru[];
  uyeler: Uye[]; 
  panelOpenState = false;
  constructor(
    public apiServis: ApiService
  ) { }

  ngOnInit() {
    this.SonEklenenSorular();
    this.SonEklenenCevaplar();
    this.SonEklenenEtiketler();
    this.SonEklenenUyeler();
    this.SonEklenenKategoriler();
  }

  SonEklenenKategoriler(){
    this.apiServis.KategoriListeSonEklenenler(10).subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }
  SonEklenenEtiketler(){
    this.apiServis.EtiketListeSonEklenenler(15).subscribe((d:Etiket[])=>{
      this.etiketler=d;
    });
  }
  SonEklenenUyeler(){
    this.apiServis.UyeListeSonEklenenler(10).subscribe((d:Uye[])=>{
      this.uyeler=d;
    });
  }

  SonEklenenSorular(){
    this.apiServis.SoruListeSonEklenenler(10).subscribe((d:Soru[])=>{
      this.sorular=d;
    });
  }

  SonEklenenCevaplar(){
    this.apiServis.CevapListeSonEklenenler(10).subscribe((d:Cevap[])=>{
      this.cevaplar=d;
    });
  }

  

}

