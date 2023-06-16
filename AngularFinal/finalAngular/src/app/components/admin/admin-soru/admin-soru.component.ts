import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Etiket } from 'src/app/models/Etiket';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';
@Component({
  selector: 'app-admin-soru',
  templateUrl: './admin-soru.component.html',
  styleUrls: ['./admin-soru.component.css']
})
export class AdminSoruComponent implements OnInit {
  kategoriler:Kategori[];
  etiketler: Etiket[];
  katId:number;
  etiketId:number;
  SoruUyeId:number;
  SoruKategoriId:number;
  SoruEtiketId: number;
  Baslik:string;
  Icerik:string;
  secKat:Kategori;
  secEtiket:Etiket;
  sorular:Soru[];
  dataSource: any;
  displayedColumns: string[] = ['Baslik', 'Goruntulenme',  'UyeKadi','EtiketAdi', 'Tarih', 'detay'];
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
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
    this.EtiketListele();
    this.SoruUyeId=parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe(p=>{
      if(p['katId']){
        this.KategoriById();
        this.katId=p['katId'];
        
     }
    })
  }

  goBack(): void {
    history.back();
  }

  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      console.log(this.katId);
      this.secKat=d;
      this.SoruListele();
    });
  }

  EtiketById(){
    this.apiServis.EtiketById(this.etiketId).subscribe((d:Etiket)=>{
      this.secEtiket=d;
    });
  }

  SoruListele(){
    this.apiServis.SoruListeByKatId(this.katId).subscribe((d:Soru[])=>{
      this.sorular=d;
      this.dataSource = new MatTableDataSource (d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
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
    this.KategoriById();
  }
 
  EtiketListele(){
    this.apiServis.EtiketListe().subscribe((d:Etiket[])=>{
      this.etiketler=d;
    });
  }

  EtiketSec(etiket:Etiket){
    this.etiketId=etiket.EtiketId;
  }


  Ekle(){
   
    var yeniKayit: Soru = new Soru();
    this.dialogRef=this.matDialog.open(SoruDialogComponent, {
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
        yeniKayit.SoruUyeId=this.SoruUyeId;  
        this.apiServis.SoruEkle(yeniKayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.SoruListele();
          }
        }); 
      }
    });
  }
 
  Duzenle(kayit:Soru){
    this.dialogRef=this.matDialog.open(SoruDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.Baslik=d.Baslik;
        kayit.Icerik=d.Icerik;
        kayit.EtiketAdi=d.EtiketAdi;
        kayit.KategoriAdi=d.KategoriAdi
        this.apiServis.SoruDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.SoruListele();
          }
        }); 
      }
    });
  }

  Detay(kayit:Soru){
    this.dialogRef=this.matDialog.open(SoruDialogComponent,{
      width: '800px',
      data:{
        kayit: kayit,
        islem: 'detay'
      }
    });
  }

  Sil(kayit:Soru){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.Baslik + " başlıklı soru silinecektir. Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe((d:any)=>{
      if (d){
        this.apiServis.SoruSil(kayit.SoruId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.SoruListele();
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