import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { UyeFoto } from 'src/app/models/UyeFoto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.css']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto:any;
  uyeFoto:UyeFoto= new UyeFoto();
  secUye:Uye;
    constructor(
      public fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
      public apiServis:ApiService 
    ) { 
      this.secUye=this.data;
    }
  
    ngOnInit() {
    }
  
  FotoSec (e:any){
    var fotolar = e.target.files;
    var foto= fotolar[0];
  
    var fr=new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto=fr.result;
      this.uyeFoto.FotoData=fr.result.toString();
      this.uyeFoto.FotoUzanti=foto.type;
    };
    fr.readAsDataURL(foto);
  }
  
  }
  
