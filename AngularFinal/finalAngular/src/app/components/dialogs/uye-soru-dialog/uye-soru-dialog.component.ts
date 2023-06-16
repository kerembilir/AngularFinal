import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etiket } from 'src/app/models/Etiket';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-soru-dialog',
  templateUrl: './uye-soru-dialog.component.html',
  styleUrls: ['./uye-soru-dialog.component.css']
})
export class UyeSoruDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Soru;
  kayit: Soru;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];
  etiketler:Etiket[];
  constructor(
    public dialogRef:MatDialogRef<UyeSoruDialogComponent>,
    public frmBuild:FormBuilder,
    public apiServis: ApiService, 
    @Inject(MAT_DIALOG_DATA) 
    public data:any
  ) { 
    this.islem=data.islem;
    console.log(this.data)
    if(this.islem=='duzenle'){
      console.log(this.yeniKayit);
      this.dialogBaslik= "Soru Düzenle";
      this.yeniKayit = data.kayit;
    }
    if (!this.yeniKayit) {
      this.yeniKayit = new Soru();
      this.kayit = data;
    }
    this.frm=this.FormOlustur();

  }

  ngOnInit() {
    this.KategoriListele();
    this.EtiketListele();
  }

  FormOlustur(){
    return this.frmBuild.group({
      Baslik:[this.yeniKayit.Baslik],
      Icerik:[this.yeniKayit.Icerik],
      SoruUyeiId:[this.yeniKayit.SoruUyeId],
      SoruKategoriId:[this.yeniKayit.SoruKategoriId],
      SoruEtiketId:[this.yeniKayit.SoruEtiketId]

    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }

  EtiketListele(){
    this.apiServis.EtiketListe().subscribe((d:Etiket[])=>{
      this.etiketler=d;
    });
  }

}