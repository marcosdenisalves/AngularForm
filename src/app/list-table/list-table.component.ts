import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from '../model/certificate';
import { Notary } from '../model/notary';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent {
  @Input() notary: Notary;

  selectedCertificates: Array<Certificate> = [];
  itemSelected: Certificate;

  certificates: Array<Certificate> = [
    new Certificate(1, '2° Via de Certidão de Casamento'),
    new Certificate(2, '2° Via de Certidão de Nascimento'),
    new Certificate(3, '2° Via de Certidão de Óbito'),
  ];

  public addItem(): void {
    if (this.selectedCertificates.length > 0) {
      validateDuplicateItens(this.itemSelected, this.selectedCertificates);
    } else {
      this.selectedCertificates.push(this.itemSelected);
    }
  }
}

function validateDuplicateItens(itemSelected: Certificate, selectedCertificates: Array<Certificate>) {
  for (var i = 0; i < selectedCertificates.length; i++) {
    if (selectedCertificates.indexOf(itemSelected) === -1) {
      selectedCertificates.push(itemSelected);
    }
  }
}

