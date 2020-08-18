import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';
import { SeekerControlsService } from './seeker-controls.service';
import { ShakaPlayerService } from './shaka-player.service';
import { SeekerEventsService } from './seeker-events.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngAfterViewInit() {
    console.log('dom loaded');

    this.componentElements = {
      audio: this.AUDIO.nativeElement,
      seeker_container: this.seeker_container.nativeElement,
      progress: this.progress.nativeElement,
      buffer_seeker: this.buffer_seeker.nativeElement,
      dot_circle: this.dot_circle.nativeElement,
      control_buttons: this.control_buttons.nativeElement
    }

    //initializing dom elements in seeker service--
    this._seeker_service.setComponentElements(this.componentElements);

    //initializing dom elements in shaka-player service--
    this._shaka_service.setAudio(this.AUDIO.nativeElement);

    //initializing seeker controls---------
    this._seeker_service.initSeeker();
    this._shaka_service.onDomReady();
    
  }


  @ViewChild('seeker_container', {static: true}) seeker_container: ElementRef;
  @ViewChild('buffer_seeker', {static: true}) buffer_seeker: ElementRef;
  @ViewChild('progress', {static: true}) progress: ElementRef;
  @ViewChild('dot_circle', {static: true}) dot_circle: ElementRef;
  @ViewChild('AUDIO', {static: true}) AUDIO: ElementRef;
  @ViewChild('control_buttons', {static: true}) control_buttons: ElementRef;
  @ViewChild('playerContainer', {static: true}) playerContainer: ElementRef

  

  title: string = 'music-player-angular';
  componentElements: object = {};
  
  playerHidden = false
  
  constructor(
    public musics_api: MusicPlayerApiService,
    private render: Renderer2,
    public _seeker_service: SeekerControlsService,
    public _shaka_service: ShakaPlayerService,
    public _events: SeekerEventsService
  ) { }
  
  ngOnInit(): void {

    this.showPlayer(null, {name:"undef", picUrl:"undef"})
    
    this.musics_api.data$.subscribe(
      (res : any) => {
        console.log(res)

        //loading manifest---
        //this._shaka_service.loadManifest('null');

        this.showPlayer(null, res)

        if(!this.playerHidden) {
          this.playerHidden = true
          this.hidePlayer({})
        }
      },
      (err) => console.error(err)
    )

  }

  

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
    //console.log(e.target.className)
    const className = e.target.className;
    //(className === 'fas fa-play fa-2x') ? (this.playPauseClass = 'fas fa-pause fa-2x') : (this.playPauseClass = 'fas fa-play fa-2x');

    if(className === 'fas fa-play fa-2x') {
      this.playPauseClass = 'fas fa-pause fa-2x';
      this._events._onPlay_Audio(e);
    }
    else {
      this.playPauseClass = 'fas fa-play fa-2x';
      this._events._onPause_Audio(e);
    }

  }




  


}
