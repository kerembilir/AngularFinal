import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  dialogMesaj: string;

  constructor(
    public alert: AlertService,
    public matDialog: MatDialog,
    public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

  ConfirmUygulama() {

    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: "400px"
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt Silinecektir Onaylıyor musunuz?";
    { } this.confirmDialogRef.afterClosed().subscribe((d: any) => {
      console.log(d);
      if (d) {
        // kayıt silme rutine
        console.log("Kayıt Silindi");
      }
    });

  }

}
