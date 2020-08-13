import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngAfterViewInit() {
    console.log('dom loaded');
    console.log(this.seeker_container.nativeElement);
  }


  @ViewChild('seeker_container', {static: true}) seeker_container: ElementRef;
  @ViewChild('seeker_buffer', {static: true}) seeker_buffer: ElementRef;
  @ViewChild('progress', {static: true}) progress: ElementRef;
  @ViewChild('dot_circle', {static: true}) dot_circle: ElementRef;




  title = 'music-player-angular';
  
  playerHidden = false
  
  constructor(public musics_api: MusicPlayerApiService, private render: Renderer2) { }
  
  ngOnInit(): void {

    this.showPlayer(null, {name:"undef", picUrl:"undef"})
    
    this.musics_api.data$.subscribe(
      res => {
        console.log(res)
        this.showPlayer(null, res)
        if(!this.playerHidden) {
          this.playerHidden = true
          this.hidePlayer({})
        }
      },
      err => console.error(err)
    )

  }

  @ViewChild('playerContainer', {static: true}) playerContainer: ElementRef

  hidePlayer(e) {

    console.log(e.target)

    var player = this.playerContainer.nativeElement
    
    //this.render.setStyle(player, 'visibility', 'hidden')
    this.render.setStyle(player, 'top', '100%')

    console.log(player)
    
  }





  
  showPlayer(e, obj) {

    //dont show player if clicked on play or pause button.
    if( e && (e.target.classList.contains('fa-pause') || e.target.classList.contains('fa-play'))) return;

    var {name, picUrl} = obj
    if(!name) name = ''
    if(!picUrl) picUrl = ''

    console.log("obj == ",  obj)

    var player = this.playerContainer.nativeElement

    
    var player_picElm = player.querySelector('#play-image')
    var player_nameElm = player.querySelector('#player-name')


    player_nameElm.innerText = name
    player_picElm.src = picUrl
    

    //this.render.setStyle(player, 'visibility', 'visible')
    this.render.setStyle(player, 'top', '0')
    

  }




  playPauseClass = 'fas fa-play fa-2x'

  clickPlayPause(e) {
    e.preventDefault();
    console.log(e.target.className)
    const className = e.target.className;
    (className === 'fas fa-play fa-2x') ? (this.playPauseClass = 'fas fa-pause fa-2x') : (this.playPauseClass = 'fas fa-play fa-2x');


  }







  /*------------------------------seeker container content-----------------------------*/
  
  // seeker container mouse events-----------------------
  _onClick_seekerContainer(e) {
    console.log(e);
    
    console.log(this.getSeekerContainerWidth());
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
    var container = this.seeker_container.nativeElement
    const complStyles = window.getComputedStyle(container);
    return parseFloat(complStyles.getPropertyValue('width').split('px')[0])
  }
  //------------------------------------------------------------










  /*--------------------------------------------END-------------------------------------*/


}
