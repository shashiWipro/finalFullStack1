import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { UtilityService } from 'src/app/services/utility-service/utility-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private adminService: AdminService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.formInitialize();
  }

  formInitialize() {
    this.userForm = this.formbuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createUser() {
    this.adminService.createUser(this.userForm.value).subscribe((resp: any) => {
      if (resp.result) {
        this.utilityService.openSnackBar('User created Successfully', 'Ok');
      } else {
        this.utilityService.openSnackBar('Username already exists', 'Ok');
      }
    });
  }

}
