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

  /**
   * call endpoint to create task function
   * @param payload task to be created
   * @returns observable
   */
  createTask(payload: any) {
    return this.http.post(
      'https://questionnaire.dargservices.com/php/tasks.php',
      payload
    );
  }

  /**
   * call endpoint to update task function
   * @param payload task to be updated
   * @returns observable
   */
  updateTask(payload: any) {
    return this.http.patch(
      'https://questionnaire.dargservices.com/php/tasks.php',
      payload
    );
  }

  /**
   * call fetch tasks endpoint
   * @returns observation
   */
  fetchTasks() {
    return this.http.get(
      'https://questionnaire.dargservices.com/php/tasks.php'
    );
  }
}
