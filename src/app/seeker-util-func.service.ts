import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeekerUtilFuncService {

  constructor() { }

   //dom element--
   el_progress = null;
   el_seeker_container = null;
   el_dot_circle = null;
   el_buffer_seeker = null;
   el_control_buttons = null;
   el_timer = null;
   el_current_timer = null;
   el_total_timer = null;
   el_player_title = null;
   el_mini_title = null;
   
 
   //common variables--
   dot_center = null;
   AUDIO = null;

   //css variables
   readonly netflixColor: string = '#e50914';
 

   setComponentElements(componentElements: any) {
    this.AUDIO = componentElements.audio,
    this.el_seeker_container = componentElements.seeker_container,
    this.el_progress = componentElements.progress,
    this.el_buffer_seeker = componentElements.buffer_seeker,
    this.el_dot_circle = componentElements.dot_circle,
    this.el_control_buttons = componentElements.control_buttons
    this.el_timer = componentElements.timer,
    this.el_current_timer = componentElements.current_timer,
    this.el_total_timer = componentElements.total_timer,
    this.el_player_title = componentElements.player_title,
    this.el_mini_title = componentElements.mini_title
   }

   init() {
    const dot_width = this.getElementWidth(this.el_dot_circle)
    const dot_center = dot_width / 2;
    this.dot_center = dot_center;

    this.disablePlayer();
    console.log(this.el_timer);
   }





    //-----------------utitiliy functions--------------------------------------
  
    getSeekerContainerWidth() {
      var container = this.el_seeker_container;
      const complStyles = window.getComputedStyle(container);
      return parseFloat(complStyles.getPropertyValue('width').split('px')[0]);
    }
  
    updateTime(percentage) {
      const time = this.calculateTimeFromPercentage(percentage, this.AUDIO.duration);
      this.AUDIO.currentTime = time;
    }
    calculateTimeFromPercentage(percentage, totalTime) {
      //50 percent of 200 formula
      //50 * 200 / 100
      const value = (percentage * totalTime) / 100;
      return value;
    }
  
    setProgressPercentage(percentage) {
      this.el_progress.style.setProperty('width', `${percentage}%`);
    }
  
  
    handleProgressBar(currentValue, totalValue) {
      const percentage = (currentValue / totalValue) * 100;
      //console.log(percentage)
      if(!percentage) return;
      //setProgressWidth(percentage)
      this.setProgressPercentage(percentage);
      //setProgressWidth()
    }
  
  
    calculateBufferWidthPercentage(start, end, totalTime) {
      return ((end - start) / totalTime) * 100
    }
  
    calculateBufferLeftPercentage(start, totalTime) {
        return (start / totalTime) * 100
    }
  
    updateBuffer(start, end) {
      const seeker_containerWidth = this.getSeekerContainerWidth();
      const percentage = this.calculateBufferWidthPercentage(start, end, this.AUDIO.duration)
      const leftPercentage = this.calculateBufferLeftPercentage(start, this.AUDIO.duration)
      //console.log(percentage)
      //console.log(leftPercentage)
      //console.log(seeker_containerWidth)
      this.el_buffer_seeker.style.setProperty('width', `${percentage}%`)
      this.el_buffer_seeker.style.setProperty('left', `${leftPercentage}%`)
    }
  
    updateDotCircle() {
      const width = this.getElementWidth(this.el_progress) - this.dot_center;
      this.el_dot_circle.style.setProperty('left', `${width}px`)
    }
  
    setProgressDotCircle(clientX, totalWidth) {
      //const percentage = pxToPercent((clientX + 1), totalWidth)
      const clientX_new = clientX - this.dot_center
      //const containerOffset = this.getContainerOffset()
      if( (clientX >=  0) && (clientX <= totalWidth)) this.el_dot_circle.style.setProperty('left', `${clientX_new}px`)
      //return percentage
      //(clientX >=  containerOffset) && 
    }


    //player reset functions-------------------------------
  resetPlayer() {
    this.el_progress.style.setProperty('width', '0%');
    this.el_buffer_seeker.style.setProperty('width', '0%');
    this.el_buffer_seeker.style.setProperty('left', '0%');
    this.updateDotCircle();
  }

  //------------------------------

  getElementWidth(element) {
    const compStyles = window.getComputedStyle(element);
    const width = parseFloat(compStyles.getPropertyValue('width').split('px')[0]);
    return width;
  }




  getContainerOffset() {
    return this.el_seeker_container.offsetLeft;
  }



  setProgressClient(clientX, totalWidth) {
    const percentage = this.pxToPercent((clientX), totalWidth)
    //console.log(percentage)
    this.el_progress.style.setProperty('width', `${percentage}%`)
    return percentage
  }


  pxToPercent(pixels, width) {
    //console.log(pixels, width)
    const percentage = (pixels / width) * 100 
    //console.log(percentage)
    return percentage
  }

  getElmentLeft(element) {
    const compStyles = window.getComputedStyle(element);
    const left = parseFloat(compStyles.getPropertyValue('left').split('px')[0]);
    return left;
  }

  handleOnMouseup() {
    const seeker_containerWidth = this.getSeekerContainerWidth()
    const left = this.getElmentLeft(this.el_dot_circle) + this.dot_center;
    const percentage = this.setProgressClient(left, seeker_containerWidth)
    
    this.updateTime(percentage)
  }

  disablePlayer() {
    this.resetPlayer();
    this.el_seeker_container.classList.add('disabled-seeker');
    this.el_control_buttons.classList.add('disabled-childs');
    this.el_timer.classList.add('disabled-childs');
    this.el_mini_title.classList.add('disabled');
    this.el_player_title.classList.add('disabled');


    this.el_mini_title.innerText = `Netflix Music`;
    this.el_player_title.innerText = `Netflix Music`;
  }

  enablePlayer() {
    this.resetPlayer();
    this.el_dot_circle.style.setProperty('background-color', this.netflixColor);
    this.el_seeker_container.classList.remove('disabled');
    this.el_control_buttons.classList.remove('disabled-childs');
    this.el_timer.classList.remove('disabled-childs');
    this.el_mini_title.classList.remove('disabled');
  }
  
    //------------------------------------------------------------

}
