import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Soru } from 'src/app/models/Soru';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sorular:Soru[];
  constructor(
    public apiServis: ApiService,
    
  ) { }

  ngOnInit() {
    this.SonEklenenler();
  }

  SonEklenenler(){
    this.apiServis.SoruListeSonEklenenler(10).subscribe((d:Soru[])=>{
      this.sorular=d;
    });
  }
}
