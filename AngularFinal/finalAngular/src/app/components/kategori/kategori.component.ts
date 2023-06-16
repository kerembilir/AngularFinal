import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  sorular:Soru[];
  katId:number;
  kat: Kategori;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['katId']){
        this.katId=p['katId'];
        this.KategoriById();
        this.SoruByKatId();
      }
    });
  }
KategoriById(){
  this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
    this.kat=d;
  });
}

SoruByKatId() {
   this.apiServis.SoruListeByKatId(this.katId).subscribe((d:Soru[])=>{
    this.sorular=d;
   });
  }

}

