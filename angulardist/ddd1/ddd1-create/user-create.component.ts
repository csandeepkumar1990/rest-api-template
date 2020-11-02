import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  firstName;
  lastName;
  email;
  password;
  phoneNumber;

  constructor(private alert: AlertService, private userService: UserService ) { }

  ngOnInit() {}

  _submitForm(horizontalForm: NgForm) {

    if(!horizontalForm.valid) {
      this.alert.error('Invalid data. Please verify');
      return;
    }

    if(horizontalForm.value.txtpassword != horizontalForm.value.txtrepeatPassword) {
      this.alert.error('Passwords are not matching. Please verify.');
      return;
    }

    let registerFormData = { firstName: '', lastName: '', email: '', password: '', phoneNumber: '',createdBy: 'admin@ultracrm.com', updatedBy: 'admin@ultracrm.com'};
    registerFormData.firstName = horizontalForm.value.firstName;
    registerFormData.lastName = horizontalForm.value.lastName;
    registerFormData.email = horizontalForm.value.email;
    registerFormData.password = horizontalForm.value.password;
    registerFormData.phoneNumber = horizontalForm.value.phoneNumber;
    

    this.userService.createUser(registerFormData).subscribe(res => {
      if(res.status == 200) {
        horizontalForm.form.reset();
        this.alert.success('User Registration is successful');
      } else {
        this.alert.error(res.message);
      }
    },
    err => {
      horizontalForm.form.reset();
       this.alert.error('Error occured: '+err);
    });

    
  }
}
