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
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

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
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  openTasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private tasksServ: TaskService
  ) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.tasksServ.fetchTasks().subscribe({
      next: (r: any) => {
        this.tasks = this.filteredTasks = r?.tasks || [];
        this.arrangeTasks();
      },
      error: (er) => {
        this.tasks = this.filteredTasks = [];
      },
    });
  }

  arrangeTasks() {
    this.openTasks = this.filteredTasks.filter(
      (task) => task?.status?.toLowerCase() == 'open'
    );

    this.pendingTasks = this.filteredTasks.filter(
      (task) => task?.status?.toLowerCase() == 'pending'
    );

    this.inProgressTasks = this.filteredTasks.filter(
      (task) => task?.status?.toLowerCase() == 'progress'
    );

    this.completedTasks = this.filteredTasks.filter(
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
        console.log(res);

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

  get currenntUser() {
    return this.auth.currentUserValue;
  }

  sortTasks(filter: string) {
    if (filter?.toLowerCase() == 'me')
      this.filteredTasks = this.tasks.filter(
        (task) => task.assignedTo == this.currenntUser.email
      );
    else if (filter?.toLowerCase() == 'all') this.filteredTasks = this.tasks;

    this.arrangeTasks();
  }
}
