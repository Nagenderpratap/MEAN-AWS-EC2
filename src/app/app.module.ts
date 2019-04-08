import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './button/button.component';
import { EventComponent } from './event/event.component';
import { TweetAddListComponent } from './tweet-add-list/tweet-add-list.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { TaskComponent } from './task/task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalModule } from 'ngx-bootstrap/modal';
// import {MatDialogModule} from '@angular/material/dialog';
// import { MdcDialogModule } from '@angular-mdc/web';


// importing MatDialogModule, MatDialog and MatDialogRef from @angular/material/dialog
const appRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tweet', component: TweetAddListComponent },
   { path: 'dashboard', component: DashboardComponent },

  { path: 'task', component: TaskComponent },

  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    RegistrationUserComponent,
    HomeComponent,
    ButtonComponent,
    EventComponent,
    TweetAddListComponent,
    TaskComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, MDBBootstrapModule, BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),ScrollDispatchModule, ReactiveFormsModule,ModalModule.forRoot(), //MdcDialogModule
  ], schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  entryComponents: [
    RegistrationUserComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
