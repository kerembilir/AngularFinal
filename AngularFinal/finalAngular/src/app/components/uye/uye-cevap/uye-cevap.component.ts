import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Cevap } from 'src/app/models/Cevap';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { CevapDialogComponent } from '../../dialogs/cevap-dialog/cevap-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-uye-cevap',
  templateUrl: './uye-cevap.component.html',
  styleUrls: ['./uye-cevap.component.css']
})
export class UyeCevapComponent implements OnInit {
  cevaplar: Cevap[];
  dataSource: any;
  uyeId:number;
  soruId:number;
  cevapId: number;
  dialogRef:MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  uye:Uye;
  selectedImage: string | undefined;
  Soru: any;
 kayit:Cevap;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
   
  ) { }
  ngOnInit(): void {
    this.uyeId=parseInt(localStorage.getItem("uid"));
    this.UyeGetir();
  }

  goBack(): void {
    history.back();
  }
UyeGetir(){
  this.apiServis.UyeById(this.uyeId).subscribe((d:Uye)=>{
    this.uye=d;
    this.Cevaplarim();
  });
}

Cevaplarim(){
    this.apiServis.CevapListeByUyeId(this.uyeId).subscribe((d:Cevap[])=>{
      this.cevaplar=d;
      
    });
  }

Duzenle(kayit:Cevap){
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
      width: '800px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Cevap)=>{
      if (d){
        kayit.CevapIcerik=d.CevapIcerik;
        kayit.SoruBaslik=d.SoruBaslik;
        kayit.KategoriAdi=d.KategoriAdi
        this.apiServis.CevapDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
          }
        }); 
      }
    });
  }
  
Sil(kayit:Cevap){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.CevapIcerik + " cevabınız silinektir. Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe((d:any)=>{
      if (d){
        this.apiServis.CevapSil(kayit.CevapId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {

          }
        }); 
      } 
    })
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
