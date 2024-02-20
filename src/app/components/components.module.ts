import { NgModule } from '@angular/core';
import { TaskCardComponent } from './task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent } from '@angular/material/dialog';
import { InputComponent } from './input/input.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TaskCardComponent, CreateTaskModalComponent, InputComponent],
  imports: [
    MatIconModule,
    MatDialogContent,
    ReactiveFormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  exports: [TaskCardComponent, InputComponent],
})
export class ComponentsModule {}
