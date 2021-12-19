import { ListTableComponent } from './list-table/list-table.component';
import { Validators, FormBuilder } from '@angular/forms';
import { AppService } from './app.service';
import { MatDialog } from '@angular/material/dialog';
import { Component} from '@angular/core';
import { Notary } from './model/notary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  notary: Notary = new Notary('', '', '', '', '', '', null);

  constructor(
    private service: AppService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  notaryGroup = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    country: ['']
  });

  openDialogAndClosed() {
    this.dialog.open(ListTableComponent, {
      height: 'auto',
      width: '100%',
    }).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit() {
    this.service.insert(this.notary).subscribe();
    console.warn(this.notaryGroup.value);
  }
}
