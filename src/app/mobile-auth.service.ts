import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileAuthService {
  constructor() {}

  checkSignature(body: any): Observable<any> {
    // return throwError(() => '');
    return of('');
  }
}
