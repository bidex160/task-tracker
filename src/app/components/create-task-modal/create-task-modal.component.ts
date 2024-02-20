import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import { Task } from '../../model/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    status: new FormControl(),
    dueDate: new FormControl(null, Validators.required),
    id: new FormControl(),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {
    this.task = data?.task;
  }
  ngOnInit(): void {
    if (this.task) this.form.patchValue(this.task);
  }

  closeModal(task?: Task) {
    this.dialogRef.close(task);
  }

  submitTask() {
    this.closeModal(this.form.value);
  }
}
