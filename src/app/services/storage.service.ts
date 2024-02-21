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

  /**
   * save item in local storage
   * @param key item key to save
   * @param value content to save
   * @returns promise
   */
  saveItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * retrieve item in local storage
   * @param key item key to retrieve
   * @returns promise
   */
  getItem(key: string) {
    let item = this.localStorage ? this.localStorage?.getItem(key) : null;
    return item ? JSON.parse(item) : null;
  }

  /**
   * remove / delete item in local storage
   * @param key item key to delete
   * @returns promise
   */
  removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
