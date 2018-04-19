import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { CreatetaskComponent } from './components/createtask/createtask.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatetaskComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];