import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListTableComponent } from './list-table/list-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Certificate } from './model/certificate';
import { AppService } from './app.service';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Notary } from './model/notary';
import Swal from 'sweetalert2';
import { RequestSpinnerService } from './request-service/request-spinner-service.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

let PHONE_MASK = [
  '(',
  /[1-9]/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

let PHONE_PATTERN = /(^\+?\d{2}\s)?\(\d{2,}\) \d{4,}\-\d{4}/g;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Certificate>();
  certificatesFromServer: Array<Certificate> = [];
  certificatesSelected: Array<Certificate> = [];
  phoneMask = PHONE_MASK;

  displayedColumns: string[] = ['id', 'name', 'action'];

  notary: Notary;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service
      .getCertificates()
      .subscribe((res) => (this.certificatesFromServer = res));
  }

  constructor(
    public requestSpinnerService: RequestSpinnerService,
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
    state: [''],
    country: [''],
    certificates: this.fb.array([]),
  });

  openDialogAndClosed() {
    this.dialog
      .open(ListTableComponent, {
        data: {
          certificatesPreSelected: this.certificatesSelected,
          certificatesFromServer: this.certificatesFromServer,
        },
        panelClass: 'custom-dialog-container',
        disableClose: true,
        height: 'auto%',
        width: '100%',
      })
      .afterClosed()
      .subscribe((result: Array<any>) => {
        this.certificatesSelected = result;
        this.dataSource.data = this.certificatesSelected;
        this.addCertificatesSelected(result);
      });
  }

  private addCertificatesSelected(result: any[]) {
    this.certificates.clear();
    result.forEach((n) => this.certificates.push(this.fb.control(n)));
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

  onSubmit() {
    this.prepareToSubmit();
    console.log(this.notary);
    this.service
      .insert(this.notary)
      .pipe(catchError((err) => {
        throw this.showErrorAlert(err)
      }))
      .subscribe((res) => {
        console.log(res);
        this.showSuccessAlert();
      });
  }

  prepareToSubmit() {
    this.notary = new Notary(
      this.name.value,
      this.email.value,
      this.phone.value,
      this.street.value,
      this.city.value,
      this.state.value,
      this.country.value,
      this.certificates.value
    );
  }

  showSuccessAlert() {
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success');
  }

  showErrorAlert(err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: err.statusText,
    });
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

  get street() {
    return this.notaryGroup.get('street') as FormControl;
  }

  get city() {
    return this.notaryGroup.get('city') as FormControl;
  }

  get state() {
    return this.notaryGroup.get('state') as FormControl;
  }

  get country() {
    return this.notaryGroup.get('country') as FormControl;
  }

  get certificates() {
    return this.notaryGroup.get('certificates') as FormArray;
  }
}
