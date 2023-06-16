import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cevap } from 'src/app/models/Cevap';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.css']
})
export class SoruComponent implements OnInit {
  soruId: number;
  soru: Soru;
  cevaplar: Cevap[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['soruId']){
        this.soruId=p['soruId'];
        this.SoruById();
        this.SoruCevapListe();
      }
    });
  }

  SoruById(){
    this.apiServis.SoruById(this.soruId).subscribe((d:Soru)=>{
      this.soru=d;
      this.SoruGorunduYap();
    })
  }

  SoruGorunduYap(){
    this.soru.Goruntulenme += 1;
    this.apiServis.SoruDuzenle(this.soru).subscribe();
  }

  SoruCevapListe(){
    this.apiServis.CevapListeBySoruId(this.soruId).subscribe((d:Cevap[])=>{
      this.cevaplar=d;
    });
  }

  CevapEkle(cevapMetni:string){
    var cevap:Cevap= new Cevap
    var uyeId: number=parseInt(localStorage.getItem("uid"));
    cevap.CevapSoruId=this.soruId;
    cevap.CevapUyeId=uyeId;
    cevap.CevapIcerik=cevapMetni;
    cevap.Tarih=new Date();

    this.apiServis.CevapEkle(cevap).subscribe((d:Sonuc)=>{
      if(d.islem){
        this.SoruCevapListe();
      }
    });
  }
}