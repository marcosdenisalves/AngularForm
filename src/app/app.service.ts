import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notary } from './model/notary';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  path = 'http://localhost:8080';

  public getCertificates(): Observable<any> {
    return this.http.get(`${this.path}/certificates`);
  }

  public insert(notary: Notary): Observable<any> {
    return this.http.post<Observable<any>>(`${this.path}/notaryoffices`, notary);
  }
}
