import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from './guards/app.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ResultsComponent } from './components/dashboard/results/results.component';
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path : 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path : 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path : 'results',
        component: ResultsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }