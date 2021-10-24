import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  
  certificates: Array<Certificate> = [
    new Certificate(1, '2° Via de Certidão de Casamento'),
    new Certificate(2, '2° Via de Certidão de Nascimento'),
    new Certificate(3, '2° Via de Certidão de Óbito'),
  ];
  
  columnsToDisplay = ['id', 'name'];
  dataSource = this.certificates;
  
  ngOnInit(): void {
    this.filter();
  }

  filter() {
    this.filterControl.valueChanges.subscribe(element => {
      const search = new RegExp(element, 'i');
      this.dataSource = this.certificates.filter(x => search.test(x.name));
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

