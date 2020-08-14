import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeekerControlsService {

  constructor() { }

  //dom element--
  el_progress = null;
  el_seeker_container = null;
  el_dot_circle = null;
  el_buffer_seeker = null;

  //common variables--
  dot_center = null;


  setVariables(seeker_container, progress, buffer_seeker, dot_circle) {
    this.el_seeker_container = seeker_container;
    this.el_progress = progress;
    this.el_buffer_seeker = buffer_seeker;
    this.el_dot_circle = dot_circle;
  }

  print() {
    console.log(this.el_seeker_container)
  }




  /*------------------------------seeker container content-----------------------------*/
  
  // seeker container mouse events-----------------------
  _onClick_seekerContainer(e) {
    console.log(e);
    const seeker_containerWidth = this.getSeekerContainerWidth()
    //progress.style.setProperty('width', `${e.clientX + 1}px`)
    const clientX = e.clientX - this.getContainerOffset()
    const percentage = this.setProgressClient(clientX, seeker_containerWidth)
  }

  _onMouseMove_seekerContainer(e) {

  }

  _onMouseDown_seekerContainer(e) {

  }

  _onMouseUp_seekerContainer(e) {

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







  //-----------------utitiliy functions--------------------------------------
  
  getSeekerContainerWidth() {
    var container = this.el_seeker_container;
    const complStyles = window.getComputedStyle(container);
    return parseFloat(complStyles.getPropertyValue('width').split('px')[0]);
  }
  //------------------------------------------------------------





  //player reset functions-------------------------------
  resetPlayer() {
    this.el_progress.style.setProperty('width', '0%');
    this.el_buffer_seeker.style.setProperty('width', '0%');
    this.el_buffer_seeker.style.setProperty('left', '0%');
    this.updateDotCircle();
  }

  updateDotCircle() {
    const width = this.getElementWidth(this.el_progress) - this.dot_center;
    this.el_dot_circle.style.setProperty('left', `${width}px`)
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














  initSeeker() {
    
    const dot_width = this.getElementWidth(this.el_dot_circle)
    const dot_center = dot_width / 2;
    this.dot_center = dot_center;


    this.resetPlayer();
  }


  /*--------------------------------------------END-------------------------------------*/




}
