import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ROUTES } from './app.routes';
import { AuthService } from './services/auth/auth.service';
import { CallbackComponent } from './components/callback/callback.component';
import { TaskService } from './services/task/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CreatetaskComponent } from './components/createtask/createtask.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import { provider } from '@angular/core';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    CreatetaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,    
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    NgbModule.forRoot(),
    MatNativeDateModule
  ],
  providers: [AuthService,TaskService,     
    {provide: BrowserXhr, useClass:CustExtBrowserXhr},
    /*{provide: LocationStrategy, useClass: HashLocationStrategy}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }