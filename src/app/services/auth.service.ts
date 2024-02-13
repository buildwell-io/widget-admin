import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SIGN_IN, URL_SIGN_OUT, URL_SIGN_UP, URL_TOKEN_REFRESH } from '../constants/api.constants';
import { StorageService } from './shared/storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface IToken {
    access: {token: string, expiresAt: number},
    refresh: {token: string, expiresAt: number},
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
      private readonly http: HttpClient,
      private readonly storageService: StorageService,
                ) {

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

    logout(): Observable<any> {
        return this.http.post(URL_SIGN_OUT, httpOptions)
    }

    refreshToken(): Observable<IToken> {
        return this.http.post<IToken>(URL_TOKEN_REFRESH, httpOptions);
    }
}
