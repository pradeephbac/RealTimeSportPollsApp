import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'; 

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import {AuthService} from './services/auth.service';
import {PollsService} from './services/pollsServices/polls.service';

import { LoginComponent } from './components/login/login.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { PollsViewComponent } from './components/dashboard/polls/polls-view/polls-view.component';

import { AuthGuard } from './guards/app.guard';

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
    PollsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    Angular2FontawesomeModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2FilterPipeModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, PollsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
