import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SIGN_IN, URL_SIGN_UP } from '../constants/api.constants';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private readonly http: HttpClient) {

    }

    /*
        password: !>64 Chars
     */
    signIn(payload: { email: string, password: string }): Observable<any> {
        return this.http.post(URL_SIGN_IN, payload)
    }

    signUp(payload: { name: string, email: string, password: string }): Observable<any> {
        return this.http.post(URL_SIGN_UP, payload)
    }
}
