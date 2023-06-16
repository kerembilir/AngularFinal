import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cevap } from 'src/app/models/Cevap';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cevap-dialog',
  templateUrl: './cevap-dialog.component.html',
  styleUrls: ['./cevap-dialog.component.css']
})
export class CevapDialogComponent implements OnInit {
  secKat:Kategori;
  secSoru:Soru;
  katId:number;
  soruId:number;
  dialogBaslik:string;
  yeniKayit:Cevap;
  islem:string;
  frm:FormGroup;
  cevaplar:Cevap[];
  sorular:Soru[];
  kategoriler: Kategori[];
  CevapSoruId:number;
  constructor(
    public dialogRef:MatDialogRef<CevapDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis: ApiService 
  ) { 
    this.islem=data.islem;
    if(this.islem=='ekle'){
      this.dialogBaslik= "Cevap Ekle";
      this.yeniKayit=new Cevap();
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik= "Cevap Düzenle";
      this.yeniKayit = data.kayit;
    }
    if(this.islem=='detay'){
      this.dialogBaslik= "Cevap Sil";
      this.yeniKayit = data.kayit;
    }
    this.frm=this.FormOlustur();

  }

  ngOnInit() {
    
    this.SoruListele();
    this.KategoriListele();
  }

  FormOlustur(){
    return this.frmBuild.group({
      CevapIcerik:[this.yeniKayit.CevapIcerik],
    });
  }
  
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.secKat=d;
      this.SoruListele();
    });
  }

  SoruById(){
    this.apiServis.SoruById(this.soruId).subscribe((d:Soru)=>{
      this.secSoru=d;
    });
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }
 
  KategoriSec(kat:Kategori){
    this.katId=kat.KategoriId;
    this.SoruListele();
    this.KategoriById();
  }
 
 
  SoruSec(soru:Soru){
    this.soruId=soru.SoruId;
    this.SoruListele();
    this.SoruById();
  }
 
  SoruListele(){
    this.apiServis.SoruListeByKatId(this.katId).subscribe((d:Soru[])=>{
      this.sorular=d;
    });
  }

}