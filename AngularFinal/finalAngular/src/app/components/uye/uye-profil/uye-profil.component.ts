import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { UyeFoto } from 'src/app/models/UyeFoto';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { FotoyukleDialogComponent } from '../../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-uye-profil',
  templateUrl: './uye-profil.component.html',
  styleUrls: ['./uye-profil.component.css']
})
export class UyeProfilComponent implements OnInit {
  dataSource: any;
  uyeId:number;
  kayitForm: FormGroup;
  fotodialogRef:MatDialogRef<FotoyukleDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  dialogRef:MatDialogRef<UyeDialogComponent>;
  kayit:Uye;

  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
   
  ) {  }

  ngOnInit() {
    this.uyeId=parseInt(localStorage.getItem("uid"));
    this.UyeGetir();
    
  }



  UyeGetir(){
    this.apiServis.UyeById(this.uyeId).subscribe((d:Uye)=>{
      this.kayit=d;
    });
  }

  Kaydet() {
    if (this.kayitForm.valid) {
      const guncelBilgiler = this.kayitForm.value;
      // Güncellenen bilgileri kaydetmek için API çağrısı yapılabilir
      console.log(guncelBilgiler);
    } else {
      // Form geçerli değilse hata mesajı gösterilebilir
      console.log('Form geçerli değil.');
    }
  }

  Iptal() {
    // İptal işlemi için gerekli kodlar buraya eklenebilir
    console.log('İptal edildi.');
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
            this.UyeGetir();
          }
        });
        
      }
    });

  
 
}
}