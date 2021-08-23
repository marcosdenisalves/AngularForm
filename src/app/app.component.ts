import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameFormControl = new FormControl('', []);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
