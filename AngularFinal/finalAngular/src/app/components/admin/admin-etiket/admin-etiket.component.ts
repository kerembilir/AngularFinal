import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Etiket } from 'src/app/models/Etiket';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EtiketDialogComponent } from '../../dialogs/etiket-dialog/etiket-dialog.component';
@Component({
  selector: 'app-admin-etiket',
  templateUrl: './admin-etiket.component.html',
  styleUrls: ['./admin-etiket.component.css']
})
export class AdminEtiketComponent implements OnInit {

  etiketler:Etiket[];
  dataSource: any;
  displayedColumns: string[] = ['EtiketAdi', 'detay'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<EtiketDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
    public location: Location
  ) { }

  ngOnInit() {
    this.EtiketListele();
  }
  goBack(): void {
    history.back();
  }
  EtiketListele(){
    this.apiServis.EtiketListe().subscribe((d:Etiket[])=>{
      this.etiketler=d;
      this.dataSource = new MatTableDataSource (d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Etiket = new Etiket();
    this.dialogRef=this.matDialog.open(EtiketDialogComponent,{
      width: '400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        this.apiServis.EtiketEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.EtiketListele();
          }
        }); 
      }
    });
  }
 

  Duzenle(kayit:Etiket){
    this.dialogRef=this.matDialog.open(EtiketDialogComponent, {
      width: '400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.EtiketAdi=d.EtiketAdi;
        this.apiServis.EtiketDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.EtiketListele();
          }
        }); 
      }
    });
  }

  Sil(kayit:Etiket){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.EtiketAdi + " etiketi silinecektir. Onaylıyor musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe((d:any)=>{
      if (d){
        kayit.EtiketAdi=d.EtiketAdi;
        this.apiServis.EtiketSil(kayit.EtiketId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.EtiketListele();
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

