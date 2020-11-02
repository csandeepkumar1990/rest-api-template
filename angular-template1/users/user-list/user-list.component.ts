import { log } from 'util';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {  

  //Sample Variables for the form
  txtfname;
  txtlname;
  txtusername;
  txtpassword;
  txtemail;
  txtphoneNumber;
  txtrepeatPassword;
  page = 1;
  limit = 20;
  //Demo code to show types of Modals
  //Please refer docs to how to include modal
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

  @ViewChild('addNewAppModal', { static: true }) addNewAppModal: ModalDirective;
  fieldTextType: boolean;

  isLoading: boolean = true;
  reorderable: boolean = true;

  advanceColumns = [
    { name: 'S.No', prop: 'sno'},
    { name: 'First Name', prop: 'firstName' },
    { name: 'Last Name', prop: 'lastName' },
    { name: 'Email', prop: 'email' },
    { name: 'Phone Number', prop: 'phoneNumber' },
    { name: 'cak Status', prop: 'cakStatus' },
    { name: 'Actions', prop: 'actions' }    
  ];
  advanceRows = [];
  cachedRows = [];
  @ViewChild(DatatableComponent, { static: true }) tableAdvance: DatatableComponent;

  //No Option YET
  //https://github.com/swimlane/ngx-datatable/issues/423
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  constructor(private alert: AlertService, private userService: UserService, public router: Router) {
    this.loadUsers();
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 960;
      this.columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
    };
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getAllUsers( this.page, this.limit).subscribe(res => {
      
      this.advanceRows = res;
      this.cachedRows = this.advanceRows;
      this.isLoading = false;
      
    },
    err => {
      console.log(err);
      this.alert.error("Unable to load users: "+err.message);
    });
  }

  ngOnInit() {}

  showModal() {
    this.addNewAppModal.show();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if(!val) {
      
      this.advanceRows = this.cachedRows;
    }
    // filter our data
    const temp = this.cachedRows.filter(function(d) {
      // Change the column name here
      // example d.places
      
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.advanceRows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }
  
  showAlert() {
    
    this.alert.success('Query Updated Succesfully');
  } 

  onUpdate(user) {
    this.router.navigate(['/users/userDetail'], { queryParams: { userId: user.id}});
  }




  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
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

  _submitForm(registerForm: NgForm) {

    if(!registerForm.valid) {
      this.alert.error('Invalid data. Please verify');
      return;
    }

    if(registerForm.value.txtpassword != registerForm.value.txtrepeatPassword) {
      this.alert.error('Passwords are not matching. Please verify.');
      return;
    }

    let registerFormData = { firstName: '', lastName: '', email: '', phoneNumber: '', password: '',createdBy: 'admin@ultracrm.com', updatedBy: 'admin@ultracrm.com'};
    registerFormData.firstName = registerForm.value.txtfname;
    registerFormData.lastName = registerForm.value.txtlname;
    registerFormData.email = registerForm.value.txtemail;
    registerFormData.phoneNumber = registerForm.value.txtphoneNumber;
    registerFormData.password = registerForm.value.txtpassword;

    this.userService.createUser(registerFormData).subscribe(res => {
      registerForm.form.reset();
      this.mdSlideUp.hide();
      this.loadUsers();
      this.alert.success('User created successfully.');
    },
    err => {
      registerForm.form.reset();
       this.alert.error('Error occured: '+err);
    });

    
  }
}
