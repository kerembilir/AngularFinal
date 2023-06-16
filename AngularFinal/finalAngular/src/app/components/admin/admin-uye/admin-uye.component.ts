import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uye } from 'src/app/models/Uye';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { UyeFoto } from 'src/app/models/UyeFoto';
import { FotoyukleDialogComponent } from '../../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  uyeler:Uye[];
  dataSource: any;
  displayedColumns: string[] = ['UyeFoto', 'KullaniciAdi', 'AdSoyad', 'Email', 'Sifre', 'detay'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UyeDialogComponent>;
  fotodialogRef:MatDialogRef<FotoyukleDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
    public location: Location
   
  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  goBack(): void {
    history.back();
  }
  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uyeler=d;
      this.dataSource = new MatTableDataSource (d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width: '400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d: Uye)=>{
      if (d){
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.UyeListele();
          }
        }); 
      }
    });
  }
 

  Duzenle(kayit:Uye){
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d: { KullaniciAdi: string; })=>{
      if (d){
        kayit.KullaniciAdi=d.KullaniciAdi;
        this.apiServis.UyeDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.UyeListele();
          }
        }); 
      }
    });
  }

  FotoGuncelle(kayit:Uye){
    this.fotodialogRef= this.matDialog.open(FotoyukleDialogComponent,{
      width:'400px',
      data: kayit
    });
    this.fotodialogRef.afterClosed().subscribe((d:UyeFoto)=>{
      if(d){
        d.UyeId=kayit.UyeId;
        this.apiServis.UyeFotoGuncelle(d).subscribe((s: Sonuc) => {
          if (s.islem) {
            this.UyeListele();
          }
        });
        
      }
    });

  }

  Sil(kayit:Uye){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.KullaniciAdi + " adlı kullanıcı silinecektir. Onaylıyor musnuz?";
    this.dialogRefConfirm.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.KullaniciAdi=d.KategoriAdi;
        this.apiServis.UyeSil(kayit.UyeId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.UyeListele();
          }
        }); 
      } 
    })
  }
}

