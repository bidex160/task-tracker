import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  /**
   * task data
   */
  @Input() task: Task;

  /**
   * event emitter to emit drop down action
   */
  @Output() action: EventEmitter<any> = new EventEmitter();

  /**
   * toggle action drop down
   */
  showActions: boolean = false;

  constructor() {}

  /**
   * on click drop down item action fucntion
   * @param action edit / delete action
   */
  onAction(action: number) {
    this.action.emit(action);
    this.showActions = false;
  }
}
