import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from '../model/certificate';
import { Notary } from '../model/notary';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  selectedCertificates: Array<Certificate> = [];
  itemSelected: Certificate;
  filterControl = new FormControl('');
  
  dataSource = new MatTableDataSource<Certificate>();
  
  certificatesFiltered: Array<Certificate>;
  certificates: Array<Certificate> = [
    new Certificate(1, '2° Via de Certidão de Casamento'),
    new Certificate(2, '2° Via de Certidão de Nascimento'),
    new Certificate(3, '2° Via de Certidão de Óbito'),
  ];
  
  columnsToDisplay = ['id', 'name'];
  

  ngOnInit(): void {
    this.initializeList();
    this.filter();
  }

  initializeList() {
    this.certificatesFiltered = this.certificates;
    this.dataSource.data = this.certificates;
  }

  filter() {
    this.filterControl.valueChanges.subscribe(element => {
      const search = new RegExp(element, 'i');
      this.certificates = this.certificatesFiltered.filter(x => search.test(x.name));
    });
  }
}

function validateDuplicateItens(itemSelected: Certificate, selectedCertificates: Array<Certificate>) {
  for (var i = 0; i < selectedCertificates.length; i++) {
    if (selectedCertificates.indexOf(itemSelected) === -1) {
      selectedCertificates.push(itemSelected);
    }
  }
}

