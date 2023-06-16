import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Soru } from 'src/app/models/Soru';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyesoru',
  templateUrl: './uyesoru.component.html',
  styleUrls: ['./uyesoru.component.css']
})
export class UyesoruComponent implements OnInit {
  sorular:Soru[];
  uyeId:number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p:any)=>{
      if(p['uyeId']){
        this.uyeId=p['uyeId'];
        this.UyeById();
        this.SoruListeByUyeId();
      }
    });
  }
UyeById(){
  this.apiServis.UyeById(this.uyeId).subscribe((d:Uye)=>{
    this.uye=d;
  });
}

SoruListeByUyeId() {
   this.apiServis.SoruListeByUyeId(this.uyeId).subscribe((d:Soru[])=>{
    this.sorular=d;
   });
  }

}
