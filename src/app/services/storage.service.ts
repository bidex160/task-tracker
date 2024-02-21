import { Inject, Injectable } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage: any;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  saveItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    let item = this.localStorage ? this.localStorage?.getItem(key) : null;
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
