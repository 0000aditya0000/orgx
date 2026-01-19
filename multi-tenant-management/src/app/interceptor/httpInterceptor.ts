import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add Authorization Header
    const token = localStorage.getItem('token'); // Replace this with your token logic
    let clonedRequest = req;

    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    console.log('Request:', clonedRequest);

    return next.handle(clonedRequest).pipe(
      tap(event => {
        console.log('Response:', event); // Log the response if needed
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error); // Handle the error globally
        return throwError(() => error);
      })
    );
  }
}
