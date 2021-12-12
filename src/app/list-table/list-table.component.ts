import { LiveAnnouncer } from "@angular/cdk/a11y";
import { SelectionModel } from "@angular/cdk/collections";
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Certificate } from "../model/certificate";

@Component({
  selector: "app-list-table",
  templateUrl: "./list-table.component.html",
  styleUrls: ["./list-table.component.css"],
})
export class ListTableComponent implements OnInit, AfterViewInit {
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  selectedCertificates: Array<Certificate> = [];
  itemSelected: Certificate;
  filterControl = new FormControl("");
  theme: ThemePalette = 'primary'

  dataSource = new MatTableDataSource<Certificate>();
  selection = new SelectionModel<Certificate>(true, []);
  displayedColumns: string[] = ["select", "id", "name"];
  certificatesFiltered: Array<Certificate>;
  certificates: Array<Certificate> = [
    new Certificate(1, "2° Via de Certidão de Casamento"),
    new Certificate(2, "2° Via de Certidão de Nascimento"),
    new Certificate(3, "2° Via de Certidão de Óbito"),
  ];

  @ViewChild(MatSort) sort: MatSort;
  @Output() closed = new EventEmitter<Boolean>();

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
  }

  filter() {
    this.filterControl.valueChanges.subscribe((element) => {
      const search = new RegExp(element, "i");
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  closeModal() {
    this.closed.emit(true);
  }
}

function validateDuplicateItens(
  itemSelected: Certificate,
  selectedCertificates: Array<Certificate>
) {
  for (var i = 0; i < selectedCertificates.length; i++) {
    if (selectedCertificates.indexOf(itemSelected) === -1) {
      selectedCertificates.push(itemSelected);
    }
  }
}
