import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    // Base url
    baseurl = 'http://vakito.com:8000';

    constructor(private http: HttpClient) { }

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // GET
    getTotales(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/totales/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    // GET
    getCrecimientos(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/crecimientos/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }


    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}