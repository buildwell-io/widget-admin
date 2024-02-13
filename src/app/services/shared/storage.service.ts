import { Injectable } from '@angular/core';
import { USER_KEY, USER_TKNS } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveTokens(response: { access: { token: string }; refresh: { token: string } }) {
    window.sessionStorage.setItem(USER_TKNS, JSON.stringify(response));
  }

  public getTokens(): any {
    const userTknsString = window.sessionStorage.getItem(USER_TKNS)!;
    return JSON.parse(userTknsString);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const tokens: string | null = window.sessionStorage.getItem(USER_TKNS);
    if (tokens) {
      return true;
    }

    return false;
  }

  removeItem(USER_TKNS: string) {
    window.sessionStorage.removeItem(USER_TKNS);
  }
}
