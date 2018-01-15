import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { PollsViewComponent } from './components/dashboard/polls/polls-view/polls-view.component';
import { ResultsComponent } from './components/dashboard/results/results.component';

// manually created services 
import {AuthService} from './services/auth.service';
import {PollsService} from './services/pollsServices/polls.service'; 
import {PollsSocketService} from './services/sockets/polls-socket.service'; 

// URL interceptors for guarding
import { AuthGuard } from './guards/app.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

// imports for socket.io
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8989', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    BarChartComponent,
    PieChartComponent,
    PollsViewComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2FilterPipeModule,
    FlashMessagesModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [AuthService, PollsService, PollsSocketService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
