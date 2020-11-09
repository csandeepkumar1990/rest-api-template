import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  marked: boolean = false;
  clearDistCheckbox: boolean = false;
  name = 'Angular';

  productForm: FormGroup;
  fieldName: any = '';
  fields: any = [];
  fieldCommand: any = '';
  parentTemplateVisibility: boolean = true;
  childTemplateVisibility: boolean = false;
  fileTemplateVisibility: boolean = false;

  apiTemplateVisibility: boolean = false;
  angularTemplateVisibility: boolean = true;

  field = '';
  options: boolean = false;
  angularTemplateValue: string = "";
  parentTemplateValue: string = "";
  childTemplateValue: string = "child=false";
  fileTemplateValue: string = "file=false";
  command: string = "node .\\app.js " + this.parentTemplateValue + ' ' + this.childTemplateValue + ' ' + this.fileTemplateValue + ' ' + this.fieldCommand;
  angularCommand: string = "node .\\app.js " + this.angularTemplateValue + " angular=true";
  clearDistTrue: string = this.command + "clear-dist-true";
  clearDistFalse: string = this.command + "clear-dist-false";
  selectedTemplateType: string = "angular";

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  ngOnInit() {
    console.log("component has been initialized!")
    this.command = "node .\\app.js " + this.angularTemplateValue + " angular=true" + ' cleardist=' + this.clearDistCheckbox;
  }


 




  clickEvent(val) {
    this.field = this.field + "  " + val
    console.log(this.command);


  }
  // if(clearDistCheckbox){
  //   this.command = this.command + "clear-dist"

  //   console.log(this.command);
  // }

  // onSelectClearDist(clearDistCheckbox){
  //   // if(clearDistCheckbox){
  //   // this.command =this.clearDistTrue
  //   // console.log(this.command);
  //   // }
  //   // else{
  //   // this.command = this.command 
  //   // console.log(this.command);
  //   // }
  // }


  addField() {
    this.fields.push(this.fieldName);
    this.fieldName = '';
    console.log(this.fields);
    this.generateFieldCommand();
  }

  removeField(fieldName) {
    const index: number = this.fields.indexOf(fieldName);
    if (index !== -1) {
      this.fields.splice(index, 1);
    }
    this.generateFieldCommand();
  }

  generateFieldCommand() {
    this.fieldCommand = this.fields.join(' ');
    console.log(this.fieldCommand);
    this.command = "node .\\app.js " + this.parentTemplateValue + ' ' + this.childTemplateValue + ' ' + this.fileTemplateValue + ' cleardist=' + this.clearDistCheckbox +' ' + this.fieldCommand ;
  }

  onSelectApiType(apiType) {
    if (apiType === 'parent') {
      console.log("in api type")
      this.parentTemplateVisibility = true;
      this.childTemplateVisibility = false;
      this.fileTemplateVisibility = false;
      this.childTemplateValue = "child=false"
      this.fileTemplateValue = "file=false"
    }
    else if (apiType === 'child') {
      console.log("in child type")
      this.parentTemplateVisibility = true;
      this.childTemplateVisibility = true;
      this.fileTemplateVisibility = false;
      this.childTemplateValue = ""
      this.fileTemplateValue = "file=false"
    }
    else if (apiType === 'file') {
      console.log("in file type")
      this.parentTemplateVisibility = false;
      this.childTemplateVisibility = false;
      this.fileTemplateVisibility = true;
      this.childTemplateValue = "child=false"
      this.parentTemplateValue = ""
      this.fileTemplateValue = "files"
    }
  }

  onSelectTemplateType(templateType) {
    if (templateType === 'angular') {
      this.apiTemplateVisibility = false;
      this.angularTemplateVisibility = true;
      this.command = "node .\\app.js " + this.angularTemplateValue + " angular=true";
    }
    else if (templateType === 'restapi') {
      this.apiTemplateVisibility = true;
      this.angularTemplateVisibility = false;
      this.command = "node .\\app.js " + this.parentTemplateValue + ' ' + this.childTemplateValue + ' ' + this.fileTemplateValue + ' ' + this.fieldCommand;
    }
    this.selectedTemplateType = templateType;
  }

  onAngularTemplateValueChange(newAngularTemplateValue) {
    this.angularTemplateValue = newAngularTemplateValue;
    this.command = "node .\\app.js " + this.angularTemplateValue + " angular=true";
  }
  
  onClearDistValueChannge(newDistValue) {
    this.clearDistCheckbox = newDistValue;
    if (this.selectedTemplateType === 'angular') {
      this.command = "node .\\app.js " + this.angularTemplateValue + " angular=true" + ' cleardist=' + this.clearDistCheckbox;
    }
    else if (this.selectedTemplateType === 'restapi') {
      this.generateFieldCommand();
    }
  }
}
