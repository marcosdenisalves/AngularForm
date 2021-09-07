import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Notary } from './model/notary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notary: Notary = new Notary('', '', '', '', '', '', null);

  constructor(private service: AppService) { }

  public submit(): void {
    this.service.insert(this.notary).subscribe();
  }
}
