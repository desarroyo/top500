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

    getCrecimiento(country: String): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/crecimiento/'+country)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }


    getContinentes(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/continentes/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }


    getCountries(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/countries/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }


    getOs(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/os/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    getManufacturer(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/manufacturer/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    getArchitecture(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/architecture/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    getProcessor(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/processor/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    getMhz(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/mhz/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    getRmax(): Observable<any> {
        return this.http.get<any>(this.baseurl + '/dj_top500/rmax/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }



    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        error.status = 616
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