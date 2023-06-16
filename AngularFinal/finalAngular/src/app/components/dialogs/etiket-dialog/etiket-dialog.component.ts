import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Etiket } from 'src/app/models/Etiket';

@Component({
  selector: 'app-etiket-dialog',
  templateUrl: './etiket-dialog.component.html',
  styleUrls: ['./etiket-dialog.component.css']
})
export class EtiketDialogComponent implements OnInit {

  dialogBaslik:string;
  yeniKayit:Etiket;
  islem:string;
  frm:FormGroup;
  constructor(
    public dialogRef:MatDialogRef<EtiketDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any 
  ) { 
    this.islem = data.islem;
    if(this.islem == 'ekle'){
      this.dialogBaslik = "Etiket Ekle";
      this.yeniKayit = new Etiket();
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik= "Etiket Düzenle";
      this.yeniKayit = data.kayit;
    }
    this.frm=this.FormOlustur();

  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      EtiketAdi:[this.yeniKayit.EtiketAdi]
    });
  }
}

