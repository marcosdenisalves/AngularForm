import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  openDialog() {
    let dialogRef = this.dialog.open(ListTableComponent, {
      height: 'auto',
      width: '100%',
    });
  }

  public submit(): void {
    this.service.insert(this.notary).subscribe();
  }
}
