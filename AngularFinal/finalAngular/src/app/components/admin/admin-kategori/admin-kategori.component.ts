import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
  kategoriler:Kategori[];
  dataSource: any;
  displayedColumns: string[] = ['KategoriAdi', 'KatSoruSay', 'detay'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KategoriDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
    public location: Location
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  goBack(): void {
    history.back();
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
      this.dataSource = new MatTableDataSource (d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Kategori = new Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width: '400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.KategoriListele();
          }
        }); 
      }
    });
  }
 

  Duzenle(kayit:Kategori){
    this.dialogRef=this.matDialog.open(KategoriDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.KategoriAdi=d.KategoriAdi;
        this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.KategoriListele();
          }
        }); 
      }
    });
  }

  Sil(kayit:Kategori){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.KategoriAdi + " kategorisi silinecektir. Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.KategoriAdi=d.KategoriAdi;
        this.apiServis.KategoriSil(kayit.KategoriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.KategoriListele();
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
