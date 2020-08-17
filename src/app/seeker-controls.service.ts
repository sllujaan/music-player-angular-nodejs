import { Injectable } from '@angular/core';
import { SeekerUtilFuncService } from './seeker-util-func.service';
import { SeekerEventsService } from './seeker-events.service';

@Injectable({
  providedIn: 'root'
})
export class SeekerControlsService {

  constructor(
    private util: SeekerUtilFuncService,
    private events: SeekerEventsService
  ) { }


  setComponentElements(componentElements: any) {
    this.util.setVariables(
      componentElements.audio,
      componentElements.seeker_container,
      componentElements.progress,
      componentElements.buffer_seeker,
      componentElements.dot_circle,
      componentElements.control_buttons
    );
    this.events.setAudio(componentElements.audio);
  }


  initSeeker() {
    this.events.init();
    this.util.init();
  }


  /*--------------------------------------------END-------------------------------------*/




}
