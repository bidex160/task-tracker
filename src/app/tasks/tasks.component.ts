import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
// import { ComponentsModule } from '../components/components.module';
import { Task } from '../model/task';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreateTaskModalComponent } from '../components/create-task-modal/create-task-modal.component';
import { ComponentsModule } from '../components/components.module';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    ComponentsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  form: FormGroup = new FormGroup({
    sort: new FormControl(null),
  });
  sortOptions = ['All', 'Me'];
  tasks: Task[] = [
    {
      id: 1,
      description: 'desc',
      dueDate: new Date().toISOString(),
      title: 'Task 1',
      status: 'Open',
      assignedTo: 'me',
    },
    {
      id: 2,
      description: 'desc',
      dueDate: new Date().toISOString(),
      title: 'Task 2',
      status: 'Open',
    },
  ];
  originalTasks: Task[] = [];
  openTasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(public dialog: MatDialog) {
    this.originalTasks = this.tasks;
    this.arrangeTasks();
  }

  arrangeTasks() {
    this.openTasks = this.tasks.filter(
      (task) => task?.status?.toLowerCase() == 'open'
    );

    this.pendingTasks = this.tasks.filter(
      (task) => task?.status?.toLowerCase() == 'pending'
    );

    this.inProgressTasks = this.tasks.filter(
      (task) => task?.status?.toLowerCase() == 'progress'
    );

    this.completedTasks = this.tasks.filter(
      (task) => task?.status?.toLowerCase() == 'completed'
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let previousData = event.previousContainer.data;
      previousData[event.previousIndex].status = event.container.id;
      transferArrayItem(
        previousData,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openTaskModal(task?: Task) {
    this.dialog
      .open(CreateTaskModalComponent, {
        data: {
          task: task,
        },
        width: '40%',
      })
      .afterClosed()
      .subscribe((res: Task) => {
        if (!res) return;
        if (!task) this.tasks.push(res);
        else {
          let idx = this.tasks.findIndex((task) => task.id == res.id);
          this.tasks[idx] = res;
        }
        this.arrangeTasks();
      });
  }

  deleteTask(delTask: Task) {
    let idx = this.tasks.findIndex((task) => task.id == delTask.id);
    this.tasks.splice(idx, 1);
    this.tasks = [...this.tasks];
    this.arrangeTasks();
  }

  onDropdownAction(action: number, task?: Task | any) {
    switch (action) {
      case 1: {
        this.openTaskModal(task);
        break;
      }
      case 2: {
        this.deleteTask(task);
        break;
      }
      default:
        return;
    }
  }

  sortTasks(filter: string) {
    if (filter?.toLowerCase() == 'me')
      this.tasks = this.originalTasks.filter((task) => task.assignedTo == 'me');
    else if (filter?.toLowerCase() == 'all') this.tasks = this.originalTasks;

    this.arrangeTasks();
    console.log(filter);
  }
}
