import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cevap } from 'src/app/models/Cevap';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { Uye } from 'src/app/models/Uye';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { UyeSoruDialogComponent } from '../../dialogs/uye-soru-dialog/uye-soru-dialog.component';

@Component({
  selector: 'app-uyenin-sorulari',
  templateUrl: './uyenin-sorulari.component.html',
  styleUrls: ['./uyenin-sorulari.component.css']
})
export class UyeninSorulariComponent implements OnInit {
  sorular:Soru[];
  cevaplar: Cevap[];
  dataSource: any;
  uyeId:number;
  dialogRef:MatDialogRef<UyeSoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  uye:Uye;
  kayit:Soru;
  yeniKayit:string;
 
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
  ) { }

  ngOnInit() {
    this.uyeId=parseInt(localStorage.getItem("uid"));
    this.UyeGetir();
  }
  goBack(): void {
    history.back();
  }
  
  UyeGetir(){
    this.apiServis.UyeById(this.uyeId).subscribe((d:Uye)=>{
      this.uye=d;
      this.Sorularim();
    });
  }
  Sorularim(){
    this.apiServis.SoruListeByUyeId(this.uyeId).subscribe((d:Soru[])=>{
      this.sorular=d;
    });
  }

  Ekle(){
   
    var yeniKayit: Soru = new Soru();
    this.dialogRef=this.matDialog.open(UyeSoruDialogComponent, {
      width: '800px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        yeniKayit=d;
        yeniKayit.Tarih=new Date();
        yeniKayit.Goruntulenme=0; 
        yeniKayit.SoruUyeId=this.uyeId;
        this.apiServis.SoruEkle(yeniKayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.Sorularim();
          }
        }); 
      }
    });
  }


  Duzenle(kayit: Soru) {
    console.log(kayit);
    this.dialogRef = this.matDialog.open(UyeSoruDialogComponent, {
      width: '800px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Soru) => {
      if (d) {
        kayit.Baslik = d.Baslik;
        kayit.Icerik = d.Icerik;
        kayit.EtiketAdi = d.EtiketAdi;
        kayit.KategoriAdi = d.KategoriAdi;
        this.apiServis.SoruDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.Sorularim();
          }
        });
      }
    });
  }
    



  Filtrele(e:any){
    var deger= e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
  }
}
