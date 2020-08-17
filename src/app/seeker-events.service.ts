import { Injectable } from '@angular/core';
import { SeekerUtilFuncService } from './seeker-util-func.service';

@Injectable({
  providedIn: 'root'
})
export class SeekerEventsService {

  constructor(private util: SeekerUtilFuncService) { }


  //common variables--
  AUDIO = null;

  //event variables
  mousedown = false
  mousemove = false
  progressDragging = false

  setAudio(audio) {
    this.AUDIO = audio;
  }


  init() {
    this.initAudioEvents();
  }



  // seeker container mouse events-----------------------
  _onClick_seekerContainer(e) {
    console.log(e);
    const seeker_containerWidth = this.util.getSeekerContainerWidth();
    //progress.style.setProperty('width', `${e.clientX + 1}px`)
    const clientX = e.clientX - this.util.getContainerOffset();
    const percentage = this.util.setProgressClient(clientX, seeker_containerWidth);

    this.util.updateTime(percentage);

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
    this.mousedown = true;
  }

  _onMouseUp_seekerContainer(e) {
        //clear mouse variables
        if(this.mousedown && this.mousemove) this.util.handleOnMouseup();
    
        this.mousedown = false;
        this.mousemove = false;
        this.progressDragging = false;
  }

  //  player container mouse events---------------------------

  _onMouseUp_playerContainer(e) {
    if(this.mousedown && this.mousemove) this.util.handleOnMouseup();
    this.mousedown = false;
    this.mousemove = false;
    this.progressDragging = false;
  }

  _onMouseMove_playerContainer(e) {
    this.mousemove = true

    if(this.mousedown) {
      this.progressDragging = true;
        const seeker_containerWidth = this.util.getSeekerContainerWidth();
        const clientX = e.clientX - this.util.getContainerOffset();
        this.util.setProgressDotCircle(clientX, seeker_containerWidth);
    }
  }


  //touch events-------------------------------------------
  _onTouchStart_seekerContainer(e) {
    this.mousedown = true;
  }

  _onTouchMove_seekerContainer(e) {
    this.mousemove = true;

    if(this.mousedown) {
      this.progressDragging = true;
        const seeker_containerWidth = this.util.getSeekerContainerWidth();
        const clientX = e.touches[0].clientX - this.util.getContainerOffset();
        this.util.setProgressDotCircle(clientX, seeker_containerWidth);
    }
  }

  _onTouchCancel_seekerContainer(e) {
    if(this.mousedown && this.mousemove) this.util.handleOnMouseup();
    this.mousedown = false;
    this.mousemove = false;
    this.progressDragging = false;
  }

  _onTouchEnd_seekerContainer(e) {
    
  }
  
  _onTouchStart_playerContainer(e) {
    this.mousemove = true;

    if(this.mousedown) {
      this.progressDragging = true;
        const seeker_containerWidth = this.util.getSeekerContainerWidth();
        const clientX = e.touches[0].clientX - this.util.getContainerOffset();
        this.util.setProgressDotCircle(clientX, seeker_containerWidth);
    }
  }

  _onTouchEnd_playerContainer(e) {
    if(this.mousedown && this.mousemove) this.util.handleOnMouseup();
    this.mousedown = false;
    this.mousemove = false;
    this.progressDragging = false;
  }

  _onTimeUpdate_Audio(e) {
    console.log('timeupdatedd...');

      if(!this.AUDIO.duration) return;

      this.util.handleProgressBar(this.AUDIO.currentTime, this.AUDIO.duration);
      if(!this.progressDragging) this.util.updateDotCircle();

      // console.log(player.getBufferedInfo().total[0])
      const bufferStart = window.player.getBufferedInfo().total[0].start;
      const bufferEnd = window.player.getBufferedInfo().total[0].end;

      //console.log(bufferStart, bufferEnd);

      this.util.updateBuffer(bufferStart, bufferEnd)
  }
  
  
  //window resize event---------------
  _onWindowResize(e) {
    console.log(e);
    this.util.updateDotCircle();
  }
  //-------------------------

  //audio events--------------
  _onPlay_Audio(e) {
    this.AUDIO.play();
  }
  _onPause_Audio(e) {
    this.AUDIO.pause();
  }
  //-----------------------





  



  //audio events------------------
  initAudioEvents() {
    this.AUDIO.addEventListener('timeupdate', e => {
      this._onTimeUpdate_Audio(e);
    })

    this.AUDIO.addEventListener('play', e => {
      console.log('play...')
    })

    document.addEventListener('mousemove', e => {
      this._onMouseMove_playerContainer(e);
    })
    
    document.addEventListener('mouseup', e => {
      this._onMouseUp_playerContainer(e);
    })

    document.addEventListener('touchstart', e => {
      this._onTouchStart_playerContainer(e);
    })

    document.addEventListener('touchend', e => {
      this._onTouchEnd_playerContainer(e);
    })

    window.addEventListener('resize', e => {
      this._onWindowResize(e);
    })

  }






}
