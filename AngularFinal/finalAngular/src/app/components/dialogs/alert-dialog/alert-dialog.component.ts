import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  dialogBaslik: string;
  dialogMesaj: string;
  dialogIslem: boolean;
  alert: any;
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>
  ) { }

  ngOnInit() {
  }
  AlertGoster(p: number) {

    var s = new Sonuc();
    if (p == 1) {
      s.islem = true;
    }
    else {
      s.islem = false;
    }
    s.mesaj = "Alert Test";

    this.alert.AlertUygula(s);
  }

}

