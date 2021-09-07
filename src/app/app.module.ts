import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListTableComponent } from './list-table/list-table.component';
import { ListTableModule } from './list-table/list-table.module';

@NgModule({
  declarations: [
    AppComponent,
    ListTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ListTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
