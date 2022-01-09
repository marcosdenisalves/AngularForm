import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestSpinnerService {
  private _loading: boolean = false;

  constructor() { }

  get loading(): boolean {
    return this._loading;
  }

  onRequestStarted(): void {
    this._loading = true;
  };

  onRequestFinished(): void {
    this._loading = false;
  };
}
