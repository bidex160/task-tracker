import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() action: EventEmitter<any> = new EventEmitter();
  showActions: boolean = false;
  constructor() {}

  onAction(action: number) {
    this.action.emit(action);
    this.showActions = false;
  }
}
