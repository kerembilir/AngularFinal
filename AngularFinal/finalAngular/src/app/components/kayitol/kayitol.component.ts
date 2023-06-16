import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kayitol',
  templateUrl: './kayitol.component.html',
  styleUrls: ['./kayitol.component.css']
})
export class KayitolComponent implements OnInit {
  kayitForm: FormGroup;
  parolaTekrar: FormControl;

yeniKayit:Uye=new Uye();
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: AlertService,
    public frmBuild:FormBuilder,
    
  ) { 
    this.kayitForm=this.FormOlustur();
    this.parolaTekrar = new FormControl('', [Validators.required, this.parolaKontrol.bind(this)]);
    
  }
  ngOnInit() {
    this.FormOlustur();
  
    }

    parolaKontrol(control: FormControl) {
      const parola = this.kayitForm.get('Sifre')?.value;
      const parolaTekrar = control.value;
      return parola === parolaTekrar ? null : { mismatch: true };
    }
    

    FormOlustur(){
      return this.frmBuild.group({
        KullaniciAdi:[this.yeniKayit.UyeId],
        AdSoyad:[this.yeniKayit.AdSoyad],
        Email:[this.yeniKayit.Email],
        Sifre:[this.yeniKayit.Sifre],

      });
    }
  KayitOl(){
 this.yeniKayit=this.kayitForm.value;
 this.yeniKayit.UyeFoto="profil.jpg";
 this.yeniKayit.UyeAdmin=0;
 console.log(this.yeniKayit);
    this.apiServis.UyeEkle(this.yeniKayit).subscribe((d:Sonuc)=>{
      if(d.islem){
        var s: Sonuc =new Sonuc();
        s.islem=false;
        s.mesaj= "Kayıt Başarılı Giriş Yapabilirsiniz!";
        this.alert.AlertUygula(s);
      }
    });
  }
 
}


