import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from './app.service';
import { ListTableComponent } from './list-table/list-table.component';
import { Notary } from './model/notary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notary: Notary = new Notary('', '', '', '', '', '', null);
  
  constructor(
    private service: AppService,
    private dialog: MatDialog
  ) { }

  openDialogAndClosed() {
    this.dialog.open(ListTableComponent, {
      height: 'auto',
      width: '100%',
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public submit(): void {
    this.service.insert(this.notary).subscribe();
  }
}
