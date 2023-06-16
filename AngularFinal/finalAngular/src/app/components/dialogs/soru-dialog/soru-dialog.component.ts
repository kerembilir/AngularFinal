import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etiket } from 'src/app/models/Etiket';
import { Kategori } from 'src/app/models/Kategori';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Soru;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];
  etiketler:Etiket[];
  constructor(
    public dialogRef:MatDialogRef<SoruDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis: ApiService 
  ) { 
    this.islem=data.islem;
    if(this.islem=='ekle'){
      this.dialogBaslik= "Soru Ekle";
      this.yeniKayit=new Soru();
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik= "Soru Düzenle";
      this.yeniKayit = data.kayit;
    }
    if(this.islem=='detay'){
      this.dialogBaslik= "Soru Detay";
      this.yeniKayit = data.kayit;
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

