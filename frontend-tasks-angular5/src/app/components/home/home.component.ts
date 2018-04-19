import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { TaskService } from '../../services/task/task.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Task } from '../../models/task.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { CreatetaskComponent } from '../createtask/createtask.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  tasks: Task[];
  user: any[];
  closeResult: string;
  dialogRef: any;
  selectedId: any;
  dataSource = new TaskDataSource(this.taskService);
  displayedColumns = ['name', 'priority', 'dueDate', 'id'];

  constructor(private route: Router, public dialog: MatDialog, private modalService: NgbModal, public auth: AuthService, public taskService: TaskService) { //
    // Get task and add it to the datasource
    this.taskService.getTasks().subscribe((task) => {
      this.dataSource = task;
    }
    );
    // Get user information
    this.auth.getUserInfo().subscribe((user) => {
      this.user = user;
    }
    );
  }
  // Open the modal dialog window, if we are updating task will be pupulated 
  openDialog(task) {
    const dialogRef = this.dialog.open(CreatetaskComponent, {
      height: '350px',
      data: { id: task._id, name: task.name, priority: task.priority, dueDate: task.dueDate }
    });
    // After closing the dialog we need to update
    dialogRef.beforeClose().subscribe(result => {
      this.refresh();
    });
  }
  // Perform the delete task service call
  deleteTask(id) {
    // Once we perform the deletion we refreshes the table
    this.taskService.deleteTask(id).subscribe((res) => {
      this.refresh();
    });
    return false;
  }
  // Refreshes the datasource of the table
  refresh() {
    this.taskService.getTask().subscribe((res) => {
      this.dataSource = new TaskDataSource(this.taskService);
    });
  }

  ngOnInit() {
  }
}

export class TaskDataSource extends DataSource<any> {

  constructor(private taskService: TaskService) {
    super();
  }

  connect(): Observable<Task[]> {
    return this.taskService.getTask();
  }

  disconnect() { }
}
