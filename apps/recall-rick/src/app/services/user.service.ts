import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _username: string | null = null;

  get username(): string | null {
    if (this._username) return this._username;
    const stored = localStorage.getItem('username');
    if (stored) this._username = stored;
    return this._username;
  }

  set username(name: string | null) {
    this._username = name;
    if (name) localStorage.setItem('username', name);
    else localStorage.removeItem('username');
  }
}
