import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/user';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private http: HttpClient) {}

  createTask(payload: any) {
    return this.http.post(
      'https://questionnaire.dargservices.com/php/tasks.php',
      payload
    );
  }

  updateTask(payload: any) {
    return this.http.patch(
      'https://questionnaire.dargservices.com/php/tasks.php',
      payload
    );
  }

  fetchTasks() {
    return this.http.get(
      'https://questionnaire.dargservices.com/php/tasks.php'
    );
  }
}
