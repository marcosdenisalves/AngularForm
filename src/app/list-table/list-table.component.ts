import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from '../model/certificate';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements OnInit, AfterViewInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      certificatesPreSelected: Array<Certificate>
      certificatesFromServer: Array<Certificate>
    }
  ) {}

  selectedCertificates: Array<Certificate> = [];

  itemSelected: Certificate;

  filterControl = new FormControl('');

  theme: ThemePalette = 'primary';

  dataSource = new MatTableDataSource<Certificate>();

  selection = new SelectionModel<Certificate>(true, []);

  certificates: Array<Certificate> = [
    new Certificate(1, '2° Via de Certidão de Casamento'),
    new Certificate(2, '2° Via de Certidão de Nascimento'),
    new Certificate(3, '2° Via de Certidão de Óbito'),
  ]

  displayedColumns: string[] = ['select', 'id', 'name'];

  certificatesFiltered: Array<Certificate>;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.initializeList();
    this.filter();
  }

  initializeList() {
    this.certificatesFiltered = this.certificates;
    this.dataSource.data = this.certificates;
    this.checkValuesPreSelected();
  }

  filter() {
    this.filterControl.valueChanges.subscribe((element) => {
      const search = new RegExp(element, 'i');
      this.dataSource.data = this.certificatesFiltered.filter((x) =>
        search.test(x.name)
      );
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  private checkValuesPreSelected() {
    if (this.data.certificatesPreSelected.length > 0) {
      this.dataSource.data = this.data.certificatesPreSelected;
      this.selection.select(...this.dataSource.data);
      this.certificates.forEach((value) => {
        const some = this.dataSource.data.some(
          (data) => value.id === data.id && value.name === data.name
        );
        if (!some)
          this.dataSource.data.push(value);
      });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
