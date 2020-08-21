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


  public mini_player_title: string = 'Neflix Music';


  setComponentElements(componentElements: any) {
    this.util.setComponentElements(componentElements);
    this.events.setAudio(componentElements.audio);
  }


  initSeeker() {
    this.events.init();
    this.util.init();
  }


  /*--------------------------------------------END-------------------------------------*/




}
