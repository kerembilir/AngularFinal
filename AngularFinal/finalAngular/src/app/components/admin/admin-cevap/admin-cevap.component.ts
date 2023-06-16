import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Cevap } from 'src/app/models/Cevap';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { CevapDialogComponent } from '../../dialogs/cevap-dialog/cevap-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-cevap',
  templateUrl: './admin-cevap.component.html',
  styleUrls: ['./admin-cevap.component.css']
})
export class AdminCevapComponent implements OnInit {
  cevaplar:Cevap[];
  kategoriler:Kategori[];
  katId:number;
  soruId:number;
  CevapUyeId:number;
  KategoriId:number;
  Baslik:string;
  CevapIcerik:string;
  secKat:Kategori;
  secSoru:Soru;
  sorular:Soru[];
  dataSource: any;
  displayedColumns: string[] = ['CevapIcerik', 'KullaniciAdi', 'Tarih', 'detay'];
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<CevapDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  uId: number;
  uid: number;
  KategoriAdi: string;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
    public route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.KategoriListele();
 
    this.CevapUyeId=parseInt(localStorage.getItem("uid"));
  }

  goBack(): void {
    history.back();
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
    this.KategoriAdi=kat.KategoriAdi;
    this.katId=kat.KategoriId;
    this.SoruListele();
    
  }
 
 
  SoruSec(soru:Soru){
    this.Baslik=soru.Baslik;
    this.soruId=soru.SoruId;
    this.CevapListele();
    
  }
 
  SoruListele(){
    this.apiServis.SoruListeByKatId(this.katId).subscribe((d:Soru[])=>{
      this.sorular=d;
    });
  }

  CevapListele(){
    this.apiServis.CevapListeBySoruId(this.soruId).subscribe((d:Cevap[])=>{
      this.cevaplar=d;
      this.dataSource = new MatTableDataSource (d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Cevap = new Cevap();
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
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
        yeniKayit.CevapUyeId=this.CevapUyeId;  
        this.apiServis.CevapEkle(yeniKayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.SoruListele();
          }
        }); 
      }
    });
  }
 
  Duzenle(kayit:Cevap){
    this.dialogRef=this.matDialog.open(CevapDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.CevapIcerik=d.CevapIcerik;
        kayit.SoruBaslik=d.SoruBaslik;
        kayit.KategoriAdi=d.KategoriAdi
        this.apiServis.CevapDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.SoruListele();
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
            this.CevapListele();
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

