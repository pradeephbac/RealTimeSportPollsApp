import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router ){
    this.creatLoginForm();
  }

  creatLoginForm () {
    this.loginForm  =  this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  disableForm() {
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }

  enableForm() {
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable();
  }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    this.authService.userLogin(user).subscribe(data => {
      if(!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm(); 
      }else{
        this.messageClass = "alert alert-success";
        this.message = data.message;
        console.log(data.user)
        this.authService.storeuserInFrontEnd(data.token, data.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // Redirect to login view
        }, 1500);
      }
    }); 
  }

  ngOnInit() {
  }

}
