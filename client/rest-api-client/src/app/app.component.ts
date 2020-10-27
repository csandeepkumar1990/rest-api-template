import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  field = '';
  options: boolean = false;

  paranttemplate: string = "";
  childtemplate: string = "false";
  command: string = "node .\\app.js " + this.paranttemplate;
  clickEvent(val) {
    this.field = this.field + "  " + val

  }

  Flag1 = false;
  Flag2 = false;
  Flag3 = false;
  function(x) {
    if (x == 1) {
      this.Flag1 = true;
      this.childtemplate = ""

    }
    else if (x == 2) {


      this.Flag2 = true;


    }
    else if (x == 3) {

      this.Flag1 = false;

    }
  }


}
