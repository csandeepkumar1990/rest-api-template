import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  field = '';

  paranttemplate: string = "";
  childtemplate: string = "";
  command: string = "node .\\app.js " ;  
  clickEvent(val){
    this.field=this.field+"  "+val
    
  }
}
