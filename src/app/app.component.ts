import { ListTableComponent } from './list-table/list-table.component';
import { FormBuilder } from '@angular/forms';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { Component} from '@angular/core';
import { Notary } from './model/notary';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from './model/certificate';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource = new MatTableDataSource<Certificate>();
  certificates: Array<Certificate> = [];

  displayedColumns: string[] = ['id', 'name'];

  notary: Notary = new Notary('', '', '', '', '', '', null);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private service: AppService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  notaryGroup = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    country: ['']
  });

  openDialogAndClosed() {
    this.dialog.open(ListTableComponent, {
      height: 'auto',
      width: '100%',
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.certificates = result;
      this.dataSource.data = result;
    });
  }

  onSubmit() {
    this.service.insert(this.notary).subscribe();
    console.warn(this.notaryGroup.value);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
