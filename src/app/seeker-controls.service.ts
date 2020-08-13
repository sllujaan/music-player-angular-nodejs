import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SeekerControlsService {

  constructor(private appCom: AppComponent) { }

  print() {
    console.log(this.appCom);  
  }


}
