import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { Task } from '../../model/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css',
})
export class CreateTaskModalComponent implements OnInit {
  task: Task;
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    status: new FormControl('open', Validators.required),
    assignedTo: new FormControl(),
    dueDate: new FormControl(null, Validators.required),
    id: new FormControl(null),
  });
  loading: boolean = false;
  users: User[] = [];
  constructor(
    private taskServ: TaskService,
    private authServ: AuthService,
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.task = data?.task;
  }
  ngOnInit(): void {
    this.fetchUsers();
    if (this.task) this.form.patchValue(this.task);
  }

  fetchUsers() {
    this.authServ.fetchUsers().subscribe({
      next: (res: any) => {
        if (res.status) this.users = res?.users || [];
        else this.users = [];
      },
      error: (er) => {
        this.users = [];
      },
    });
  }

  closeModal(task?: Task) {
    this.dialogRef.close(task);
  }

  submitTask() {
    this.loading = true;
    let formData: FormData = new FormData();

    formData.append('task', JSON.stringify(this.form.value));

    if (this.form.value.id)
      this.taskServ.updateTask(formData).subscribe({
        next: (r: any) => {
          this.loading = false;
          if (r.status) {
            this.closeModal({ ...this.form.value });
          }
        },
        error: (er) => {
          this.loading = false;
        },
      });
    else
      this.taskServ.createTask(formData).subscribe({
        next: (r: any) => {
          this.loading = false;
          if (r.status) {
            this.closeModal({ ...this.form.value, id: r.taskId });
          }
        },
        error: (er) => {
          this.loading = false;
        },
      });
  }
}
