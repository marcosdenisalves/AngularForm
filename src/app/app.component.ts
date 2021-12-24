import { ListTableComponent } from './list-table/list-table.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Notary } from './model/notary';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from './model/certificate';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

let PHONE_MASK = ['(', /[1-9]/, /\d/,')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/,'-', /\d/, /\d/, /\d/, /\d/];

let PHONE_PATTERN = /(^\+?\d{2}\s)?\(\d{2,}\) \d{4,}\-\d{4}/g;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Certificate>();
  certificatesSelected: Array<Certificate> = [];
  phoneMask = PHONE_MASK;

  displayedColumns: string[] = ['id', 'name', 'action'];

  notary: Notary = new Notary('', '', '', '', '', '', null);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private service: AppService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  notaryGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    street: [''],
    city: [''],
    country: [''],
  });

  openDialogAndClosed() {
    this.dialog
      .open(ListTableComponent, {
        data: { certificatesPreSelected: this.certificatesSelected },
        panelClass: 'custom-dialog-container',
        disableClose: true,
        height: 'auto%',
        width: '100%',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.certificatesSelected = result;
        this.dataSource.data = this.certificatesSelected;
      });
  }

  onSubmit() {
    this.service.insert(this.notary).subscribe();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteItemFromTable(index: number) {
    if (this.certificatesSelected != undefined) {
      this.certificatesSelected.splice(index, 1);
      this.dataSource.data = this.certificatesSelected;
    }
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    if (this.phone.hasError('required')) {
      return 'You must enter a value';
    }
    return this.phone.hasError('pattern') ? 'Invalid phone number' : '';
  }

  get name() {
    return this.notaryGroup.get('name') as FormControl;
  }

  get email() {
    return this.notaryGroup.get('email') as FormControl;
  }

  get phone() {
    return this.notaryGroup.get('phone') as FormControl;
  }
}
