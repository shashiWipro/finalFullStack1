import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  showError = false;
  logInForm: FormGroup;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    this.logInForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.adminService.login(this.logInForm.value).subscribe((resp: any) => {
      if (resp.result) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/admin']);
      } else {
        this.showError = true;
      }
    });
  }
}
