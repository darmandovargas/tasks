import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Task } from '../../models/task.model';

@Injectable()
export class TaskService {

  private serviceUrl = 'http://localhost:3000/tasks';

  constructor(public http: Http, public httpClient: HttpClient) {
    console.log('Task service connected...');
  }

  // POST: add a new task to the database
  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.serviceUrl, task);
  }
  // DELETE: deletes the register
  deleteTask(id) {
    return this.httpClient.delete(this.serviceUrl + "/" + id).map((response: string) => response);
  }
  // PUT: updates the register
  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.serviceUrl + "/" + task.id, task);
  }
  // TODO: Get a task
  getTask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.serviceUrl);
  }
  // Get all tasks
  getTasks() {

    var options = new RequestOptions({
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      })
    });
    return this.http.get('http://localhost:3000/tasks', options)
      .map(res => res.json());
  }
  // TODO: Get task by name
  getTaskByName(name) {
    //return this.http.get('http://localhost:3000/tasksByName/gettaskbyname/?tasklName='+name)
    //.map(res => res.json());
  }
  // get task by id
  getTaskById(id) {
    var options = new RequestOptions({
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        '_id': id
      })
    });
    return this.http.get('http://localhost:3000/tasks', options)
      .map(res => res.json());
  }
  // TODO: custom query
  query(params) {
    //return this.http.get('http://localhost:3000/tasks')
    //.map(res => res.json());
  }
}
