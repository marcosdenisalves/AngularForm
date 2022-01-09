import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { RequestSpinnerService } from '../request-service/request-spinner-service.service';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private requestSpinnerService: RequestSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestSpinnerService.onRequestStarted();
    return next.handle(request).pipe(
      finalize(() => this.requestSpinnerService.onRequestFinished())
    );
  }
}
