import { Component, Input, OnChanges, OnInit, Inject }       from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, priorities } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';
import { forbiddenNameValidator } from './forbidden-name.directive';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})

export class CreatetaskComponent implements OnChanges, OnInit {
  //@Input() task: Task;
  task:Task;
  taskForm: FormGroup;
  priorities = priorities;
  // Data receives the parameters from modal, dialog will help us 
  // close the home parent modal dialog, and task service will do the CRUD 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private taskService: TaskService) {
  }
  // Initialize task object
  ngOnInit():void{
    // If we have id then we are getting parameters from parent modal container so we need to update the form
    if(!this.data.id)
      this.task = {id:'', name:'', priority: this.priorities[0], dueDate:''};
    else
      this.task = {id:this.data.id, name:this.data.name, priority: this.data.priority, dueDate:this.data.dueDate};
    // Define the form group controls and validations
    this.taskForm = new FormGroup({
      'id': new FormControl(this.task.id),
      'name': new FormControl(this.task.name, [Validators.required]),
      'priority': new FormControl(this.task.priority, Validators.required),
      'dueDate': new FormControl(this.task.dueDate, Validators.required)
    });
  }
  
  ngOnChanges() {
    this.rebuildForm();
  }
  
  rebuildForm() {
    this.taskForm.reset({
      id: this.task.id,
      name: this.task.name,
      priority: this.task.priority,
      dueDate: this.task.dueDate
    });    
  }
  
  onSubmit() {
    // Prepare data for save
    this.task = this.prepareSaveTask();
    // Check if we are saving or updating and use the service
    if(this.task.id)
      this.taskService.updateTask(this.task).subscribe(/* error handling */);
    else
      this.taskService.addTask(this.task).subscribe(/* error handling */);
    // Closes the parent modal dialog
    this.dialog.closeAll();
    // Resets the form
    this.rebuildForm();    
  }

  prepareSaveTask(): Task {
    const formModel = this.taskForm.value;
    // return new `Task` object containing a combination of original task value(s)
    // and deep copies of changed form model values
    const saveTask: Task = {
      id: formModel.id,
      name: formModel.name as string,
      priority: formModel.priority,
      dueDate: formModel.dueDate
    };
    return saveTask;
  }

  reset() { this.rebuildForm(); }
}