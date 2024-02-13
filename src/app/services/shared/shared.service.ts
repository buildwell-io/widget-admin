import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { USER_TKNS } from '../../constants/app.constants';

interface IUser {
  roles: string[];
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private user: IUser = {roles: [], username: ''};

  constructor(private readonly storageService: StorageService) { }

  isLoggedIn() {
    return !!(this.storageService.isLoggedIn() || null);
  }

  setUser(userData: IUser): void {
    this.user = userData;
  }

  getUser(): IUser {
    return this.user;
  }

  clean() {
    this.storageService.removeItem(USER_TKNS);
  }
}
