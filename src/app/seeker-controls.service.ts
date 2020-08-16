import { Injectable, HostListener } from '@angular/core';
import { ShakaPlayerService } from './shaka-player.service';
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

  //dom element--
  el_progress = null;
  el_seeker_container = null;
  el_dot_circle = null;
  el_buffer_seeker = null;

  //common variables--
  dot_center = null;
  AUDIO = null;

  //event variables
  mousedown = false
  mousemove = false
  progressDragging = false


  setVariables(audio, seeker_container, progress, buffer_seeker, dot_circle) {
    this.AUDIO = audio;
    this.el_seeker_container = seeker_container;
    this.el_progress = progress;
    this.el_buffer_seeker = buffer_seeker;
    this.el_dot_circle = dot_circle;

    this.util.setVariables(
      this.AUDIO,
      this.el_seeker_container,
      this.el_progress,
      this.el_buffer_seeker,
      this.el_dot_circle
    );

    this.events.setVariables(
      this.AUDIO,
      this.el_seeker_container,
      this.el_progress,
      this.el_buffer_seeker,
      this.el_dot_circle
    );

  }


  initSeeker() {
    this.events.init();
    this.util.init();
  }


  /*--------------------------------------------END-------------------------------------*/




}
