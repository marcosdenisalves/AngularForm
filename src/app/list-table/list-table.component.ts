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

  public addCertificate(newCertificate: Certificate): void {
    this.selectedCertificates.push(newCertificate);
  }

  public addItem(): void {
    validateDuplicateItens();
  }
}

function validateDuplicateItens() {
  for (var i = 0; i < this.selectedCertificates.length; i++) {
    if (this.selectedCertificates.indexOf(this.itemSelected) === -1) {
      this.selectedCertificates.push(this.itemSelected);
    }
  }
}

