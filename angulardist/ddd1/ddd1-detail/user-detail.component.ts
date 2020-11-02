import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { RolesService } from '../../../services/roles.service';
import { UserRolesService } from '../../../services/userroles.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  isLoading: boolean = true;
  //Sample Variables for the form
  firstName;
  lastName;
  userEmail;
  userPassword;
  userPhoneNumber;
  userRepeatPassword;
  userId: any;
  userDetails: any;
  roles: any;
  page = 1;
  limit = 20;

  @ViewChild('mdSlideUp', { static: true }) mdSlideUp: ModalDirective;
  @ViewChild('smSlideUp', { static: true }) smSlideUp: ModalDirective;
  @ViewChild('mdStickUp', { static: true }) mdStickUp: ModalDirective;
  @ViewChild('smStickUp', { static: true }) smStickUp: ModalDirective;

  slideUp: any = {
    type: 'md'
  };
  stickUp: any = {
    type: 'md'
  };

  constructor(private router: Router, private alert: AlertService, private route: ActivatedRoute, 
    private userService: UserService, private roleService: RolesService, private userRolesService: UserRolesService) { }

  ngOnInit() {
    this.getUserId();
    this.loadUserDetails();
    this.loadRoles();
    //this.loadUserRoles();
  }

  getUserId() {
    this.route.queryParams.subscribe((params: Params) =>
      this.userId = params["userId"]
    );
  }

  loadUserDetails() {
    this.isLoading = true;
    this.userService.getUserDetails(this.userId).subscribe(res => {
      this.userDetails = res;
      this.firstName = this.userDetails.firstName;
      this.lastName = this.userDetails.lastName;
      this.userEmail = this.userDetails.email;
      this.userPhoneNumber = this.userDetails.phoneNumber;
      this.isLoading = false;
    },
      err => {
         this.alert.error('Error occured: '+err);
      });
  }


  loadRoles() {
    this.isLoading = true;
    this.roleService.getAllEnabledRoles(this.userId).subscribe(res => {
     this.roles = res;
     this.isLoading = false;
    },
    err => {
        this.alert.error('Error occured: '+err);
    });
  }

  loadUserRoles() {
    this.isLoading = true;
    this.userRolesService.getAllUserRoles(this.userId ,this.page, this.limit).subscribe(res => {
      console.log(res);
      this.isLoading = false;
    },
    err => {
       console.log(err);
       this.alert.error('Error occured: '+err);
    });
    
  }


  showStickUp() {
    switch (this.stickUp.type) {
      case 'md': {
        this.mdStickUp.show();
        break;
      }
      case 'lg': {
        this.mdStickUp.show();
        break;
      }
      case 'sm': {
        this.smStickUp.show();
        break;
      }
    }
  }

  showSlideUp() {
    switch (this.slideUp.type) {
      case 'md': {
        this.mdSlideUp.show();
        break;
      }
      case 'lg': {
        this.mdSlideUp.show();
        break;
      }
      case 'sm': {
        this.smSlideUp.show();
        break;
      }
    }
  }

  showDeleteModal() {
    this.smSlideUp.show();
  }

  showEditModal() {
    this.mdSlideUp.show();
  }

  deleteItem() {
    this.userService.deleteUser(this.userDetails.id).subscribe(res => {
      this.smSlideUp.hide();
      this.router.navigate(['/users/usersList']);
      this.alert.success('User Deleted Successfully.');
      this.loadUserDetails();
    },
      err => {
        console.log(err);
         this.alert.error('Error occured: '+err);
      });
  }

  _submitForm(updateUserForm: NgForm) {

    if (!updateUserForm.valid) {
      this.alert.error('Invalid data. Please verify');
      return;
    }

    this.mdSlideUp.hide();
    let updateUserFormData = { id: '', firstName: '', lastName: '', email: '', password: '', phoneNumber: '', createdBy: 'admin@ultracrm.com', updatedBy: 'admin@ultracrm.com' };
    updateUserFormData.id = this.userDetails.id;
    updateUserFormData.firstName = updateUserForm.value.firstName;
    updateUserFormData.lastName = updateUserForm.value.lastName;
    updateUserFormData.email = updateUserForm.value.userEmail;
    updateUserFormData.phoneNumber = updateUserForm.value.userPhoneNumber;

    this.isLoading = true;
    this.userService.updateUser(updateUserFormData).subscribe(res => {
      updateUserForm.form.reset();
      this.alert.success('User update is successful');
      this.loadUserDetails();
      this.isLoading = false;
    },
      err => {
        updateUserForm.form.reset();
         this.alert.error('Error occured: '+err);
      });
  }

  enableRoleEvent(role: any, event: any) {
    const isChecked = event.currentTarget.checked;

    const data = {
      userId: this.userDetails.id,
      roleId: role.id
    }
    if(isChecked) {
      this.isLoading = true;
      this.userRolesService.createUserRole(data).subscribe(res => {
        //this.loadRoles();
        event.currentTarget.checked = true;
        this.isLoading = false;
        this.alert.success('Role: ' + role.name +  ' enabled successfully.');
      },
      err => {
        console.log(err);
          this.alert.error('Error occured: '+err);
      });
    } else {
      this.isLoading = true;
      this.userRolesService.deleteUserRole(data).subscribe(res => {
        //this.loadRoles();
        this.isLoading = false;
        this.alert.success('Role: ' + role.name +  ' disabled successfully.');
      },
      err => {
        console.log(err);
          this.alert.error('Error occured: '+err);
      });
    }
  
    
  }
}
