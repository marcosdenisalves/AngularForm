import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Certificate } from 'crypto';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class DataSourceComponent extends MatTableDataSource<Certificate> {
  ngOnInit(): void {
  }
}

