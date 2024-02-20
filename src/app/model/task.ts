export interface Task {
  id: number;
  description: any;
  status: string;
  title: string;
  dueDate: string;
  assignedTo?: string;
}
