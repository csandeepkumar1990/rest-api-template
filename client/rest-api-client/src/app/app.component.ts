import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  
  productForm: FormGroup;
  fieldName: any = '';
  fields: any = [];
  fieldCommand: any = '';
  parentTemplateVisibility: boolean = true;
  childTemplateVisibility: boolean = false;
  fileTemplateVisibility: boolean = false;

  apiTemplateVisibility: boolean = false;
  angularTemplateVisibility: boolean = false;
   
  constructor(private fb:FormBuilder) {
   
    this.productForm = this.fb.group({
      quantities: this.fb.array([]) ,
    });
  }
 
  
  field = '';
  options: boolean = false;
  angularTemplateValue: string = "";
  parentTemplateValue: string = "";
  childTemplateValue: string = "child=false";
  fileTemplateValue: string = "file=false";
  command: string = "node .\\app.js " + this.parentTemplateValue + ' ' + this.childTemplateValue + ' ' +  this.fileTemplateValue + ' ' +  this.fieldCommand;
  angularCommand: string = "node .\\app.js " + this.angularTemplateValue;
  clickEvent(val) {
    this.field = this.field + "  " + val

  }

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
    this.command = "node .\\app.js " + this.parentTemplateValue + ' ' + this.childTemplateValue + ' ' +  this.fileTemplateValue + ' ' +  this.fieldCommand;
  }

  onSelectApiType(apiType) { 
    if (apiType === 'parent') {
      this.childTemplateVisibility = false;
      this.fileTemplateVisibility = false;
      this.childTemplateValue = "child=false"
      this.fileTemplateValue = "file=false"
    }
    else if (apiType === 'child') {
      this.childTemplateVisibility = true;
      this.fileTemplateVisibility = false;
      this.childTemplateValue = ""
      this.fileTemplateValue = "file=false"
    }
    else if (apiType === 'file') {
      this.childTemplateVisibility = false;
      this.fileTemplateVisibility = true;
      this.childTemplateValue = "child=false"
      this.fileTemplateValue = "files"
    }
  }

  onSelectTemplateType(apiType) { 
    if (apiType === 'angular') {
      this.apiTemplateVisibility = false;
      this.angularTemplateVisibility = true;
      
   
    }
    else if (apiType === 'restapi') {
      this.apiTemplateVisibility = true;
      this.angularTemplateVisibility = false;
    }
  }
}
