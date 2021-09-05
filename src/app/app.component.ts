import { Certificate } from './model/certificate';
import { Notary } from './model/notary';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notary: Notary = new Notary('', '', '', '', '', '', null);

  constructor(private service: AppService) { }

  certificates: Array<Certificate> = [
    new Certificate(1, '2° Via de Certidão de Casamento'),
    new Certificate(2, '2° Via de Certidão de Nascimento'),
    new Certificate(3, '2° Via de Certidão de Óbito'),
  ];

  public submit(): void {
    this.service.insert(this.notary);
  }
}
