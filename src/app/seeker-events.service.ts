import { Injectable, HostListener } from '@angular/core';
import { SeekerUtilFuncService } from './seeker-util-func.service';

@Injectable({
  providedIn: 'root'
})
export class SeekerEventsService {

  constructor(private util: SeekerUtilFuncService) { }


  //dom element--
  el_progress = null;
  el_seeker_container = null;
  el_dot_circle = null;
  el_buffer_seeker = null;

  //common variables--
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
  }

  init() {
    this.initAudioEvents();
  }



  // seeker container mouse events-----------------------
  _onClick_seekerContainer(e) {
    console.log(e);
    const seeker_containerWidth = this.util.getSeekerContainerWidth()
    //progress.style.setProperty('width', `${e.clientX + 1}px`)
    const clientX = e.clientX - this.util.getContainerOffset()
    const percentage = this.util.setProgressClient(clientX, seeker_containerWidth)

    this.util.updateTime(percentage)

  }

  _onMouseMove_seekerContainer(e) {
    this.mousemove = true

    if(this.mousedown) {
      this.progressDragging = true;
        const seeker_containerWidth = this.util.getSeekerContainerWidth();
        const clientX = e.clientX - this.util.getContainerOffset();
        this.util.setProgressDotCircle(clientX, seeker_containerWidth);
    }
  }

  _onMouseDown_seekerContainer(e) {
    this.mousedown = true
  }

  _onMouseUp_seekerContainer(e) {
        //clear mouse variables
        if(this.mousedown && this.mousemove) this.util.handleOnMouseup();
    
        this.mousedown = false
        this.mousemove = false
        this.progressDragging = false
  }

  //  player container mouse events---------------------------

  _onMouseUp_playerContainer(e) {

  }

  _onMouseMove_playerContainer(e) {
    
  }


  //touch events-------------------------------------------
  _onTouchStart_seekerContainer(e) {
  
  }

  _onTouchMove_seekerContainer(e) {
    
  }

  _onTouchCancel_seekerContainer(e) {
    
  }

  _onTouchEnd_seekerContainer(e) {
    
  }
  
  _onTouchStart_playerContainer(e) {
    console.log(e)
  }

  _onTouchEnd_playerContainer(e) {
    
  }
  
  
  //window resize event---------------
  @HostListener('window:resize', ['$event'])
  _onWindowResize(e) {
    console.log(e)
  }
  //-------------------------





  



  //audio events------------------
  initAudioEvents() {
    this.AUDIO.addEventListener('timeupdate', e => {
      console.log('timeupdatedd...');

      if(!this.AUDIO.duration) return;

      this.util.handleProgressBar(this.AUDIO.currentTime, this.AUDIO.duration);
      if(!this.progressDragging) this.util.updateDotCircle();

      // console.log(player.getBufferedInfo().total[0])
      const bufferStart = window.player.getBufferedInfo().total[0].start;
      const bufferEnd = window.player.getBufferedInfo().total[0].end;

      //console.log(bufferStart, bufferEnd);

      this.util.updateBuffer(bufferStart, bufferEnd)
    })
  }






}
