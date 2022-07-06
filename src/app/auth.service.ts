import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(response: any): Observable<any> {
    // return throwError(() => '');
    return of('');
  }
}
