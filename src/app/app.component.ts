import { Component, VERSION } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MobileAuthService } from './mobile-auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  unsubscribe = new Subject<void>();

  constructor(
    private mobileAuthSvc: MobileAuthService,
    private auth: AuthService
  ) {
    const body = {};
    // this.mobileAuthSvc
    //   .checkSignature(body)
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe({
    //     next: (response) =>
    //       this.auth
    //         .login(response)
    //         .pipe(takeUntil(this.unsubscribe))
    //         .subscribe({
    //           next: (v) => console.log('subsub success'),
    //           error: (e) => console.log('subsub error'),
    //           complete: () => console.log('subsub complete'),
    //         }),
    //     error: (e) => console.log('sub error'),
    //   });

    this.mobileAuthSvc
      .checkSignature(body)
      .pipe(
        switchMap((response) =>
          this.auth.login(response).pipe(
            catchError((e) => {
              console.log('open modal status-error');
              return throwError(() => e);
            })
          )
        ),
        takeUntil(this.unsubscribe)
      )
      .subscribe({
        error: (e) =>
          console.log('router.navigate or publicKeyRequest'),
      });
  }
}
