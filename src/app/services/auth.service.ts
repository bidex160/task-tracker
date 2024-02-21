import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private appStorage: StorageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.init();
  }

  async init() {
    this.currentUserSubject = new BehaviorSubject<User>(
      await this.appStorage.getItem('taskAuth')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    } else {
      return null;
    }
  }

  /**
   * call endpoint to login user
   * @param payload payload email  & passowrd
   * @returns observable
   */
  login(payload: any) {
    return this.http
      .post('https://questionnaire.dargservices.com/php/login.php', payload)
      .pipe(
        map((r: any) => {
          if (r.status) {
            this.currentUserSubject.next(r.user);
            this.appStorage.saveItem('taskAuth', r.user);
          }
          return r;
        })
      );
  }

  /**
   * call endpoint to create new user
   * @param payload payload user data
   * @returns observable
   */
  signup(payload: any) {
    return this.http
      .post('https://questionnaire.dargservices.com/php/register.php', payload)
      .pipe(
        map((r: any) => {
          if (r.status) {
            this.currentUserSubject.next(r.user);
            this.appStorage.saveItem('taskAuth', r.user);
          }
          return r;
        })
      );
  }

  /**
   * call endpoint to fetch all users
   * @returns promise
   */
  fetchUsers() {
    return this.http.get(
      'https://questionnaire.dargservices.com/php/users.php'
    );
  }

  /**
   * logout user
   * remove item from local storage and route to login
   */
  logout() {
    // // remove user from local storage and set current user to null
    this.appStorage.removeItem('taskAuth');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl(`auth`);
    // this.deactivateApp();
  }
}
