import { Component, OnInit, Renderer2, ViewChild, ElementRef, isDevMode } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';
import { SeekerControlsService } from './seeker-controls.service';
import { ShakaPlayerService } from './shaka-player.service';
import { SeekerEventsService } from './seeker-events.service';
import { SeekerUtilFuncService } from './seeker-util-func.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngAfterViewInit() {
    //all the child components have been loaded.
    console.log('dom loaded');

    this.componentElements = {
      audio: this.AUDIO.nativeElement,
      seeker_container: this.seeker_container.nativeElement,
      progress: this.progress.nativeElement,
      buffer_seeker: this.buffer_seeker.nativeElement,
      dot_circle: this.dot_circle.nativeElement,
      control_buttons: this.control_buttons.nativeElement,
      timer: this.timer.nativeElement,
      current_timer: this.current_timer.nativeElement,
      total_timer: this.total_timer.nativeElement,
      player_title: this.player_title.nativeElement,
      mini_title: this.mini_title.nativeElement,
      mini_play_pause: this.mini_play_pause.nativeElement
    }

    //initializing dom elements in seeker service--
    this._seeker_service.setComponentElements(this.componentElements);

    //initializing dom elements in shaka-player service--
    this._shaka_service.setAudio(this.AUDIO.nativeElement);

    //initializing seeker controls---------
    this._seeker_service.initSeeker();
    this._shaka_service.onDomReady();

    //handle obsreveable
    this.onMusicClickObservable();
    this._handle_playPause_observable();
    
  }


  @ViewChild('seeker_container', {static: true}) seeker_container: ElementRef;
  @ViewChild('buffer_seeker', {static: true}) buffer_seeker: ElementRef;
  @ViewChild('progress', {static: true}) progress: ElementRef;
  @ViewChild('dot_circle', {static: true}) dot_circle: ElementRef;
  @ViewChild('AUDIO', {static: true}) AUDIO:  ElementRef;
  @ViewChild('control_buttons', {static: true}) control_buttons: ElementRef;
  @ViewChild('playerContainer', {static: true}) playerContainer: ElementRef
  @ViewChild('timer', {static: true}) timer: ElementRef
  @ViewChild('current_timer', {static: true}) current_timer: ElementRef
  @ViewChild('total_timer', {static: true}) total_timer: ElementRef
  @ViewChild('player_title', {static: true}) player_title: ElementRef
  @ViewChild('mini_title', {static: true}) mini_title: ElementRef
  @ViewChild('mini_play_pause', {static: true}) mini_play_pause: ElementRef
  
  
  title: string = 'music-player-angular';
  componentElements: object = {};
  mini_player_URL = 'assets/default.png';
  //mini_player_title = 'This is the title song.';
  
  playerHidden = false
  
  constructor(
    public musics_api: MusicPlayerApiService,
    private render: Renderer2,
    public _seeker_service: SeekerControlsService,
    public _shaka_service: ShakaPlayerService,
    public _events: SeekerEventsService,
    public _util: SeekerUtilFuncService
  ) { }
  
  ngOnInit(): void {
    
  }

  
  hidePlayer(e) {

    console.log(e.target)

    var player = this.playerContainer.nativeElement
    
    //this.render.setStyle(player, 'visibility', 'hidden')
    this.render.setStyle(player, 'top', '110%')

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




  public playPauseClass = 'fas fa-play fa-2x';

  clickPlayPause(e) {
    e.preventDefault();
    const className = e.target.className;

    if(className.includes('fa-play')) {
      this.AUDIO.nativeElement.play();
    }
    else {
      this.AUDIO.nativeElement.pause();
    }
  }

  onMusicClickObservable() {
    
    this.musics_api.data$.subscribe(
      (res : any) => {
        console.log(res)

        // if(Object.keys(res).length !== 0 && res.constructor() === Object) {

        // }

        //loading manifest---
        const mpdUri = `assets/manifests${res.manifestUri}`;
        if(res.manifestUri) this._shaka_service.loadManifest(mpdUri);

        //1. load image to mini player--
        if(res.picUrl) this.mini_player_URL = res.picUrl;
        //2. load title to mini player--
        if(res.name) {
          console.log("res.name ==> ", res.name);
          this._seeker_service.mini_player_title = res.name;
        }


        this.showPlayer(null, res)

        if(!this.playerHidden) {
          this.playerHidden = true;
          this.hidePlayer({});
        }
      },
      (err) => console.error(err)
    )
  }



  _handle_playPause_observable() {
    this._util.playPauseClass$.subscribe(
      (res: string) => {
        console.log("player pause res ==> ", res)
        if(res) this.playPauseClass = res;
      }
      ,
      (err: any) => {
        console.error(err);
      }
    )
  }

  showFeatureNotAvailable(featureName: string) {
    alert(`${featureName} feature currently not available!`);
  }

  


}



/*
clickPlayPause(e) {
    e.preventDefault();
    //console.log(e.target.className)
    const className = e.target.className;
    //(className === 'fas fa-play fa-2x') ? (this.playPauseClass = 'fas fa-pause fa-2x') : (this.playPauseClass = 'fas fa-play fa-2x');
    console.log(className)

    if(className === 'fas fa-play fa-2x') {
      this.playPauseClass = 'fas fa-pause fa-2x';
      this._events._onPlay_Audio(e);
    }
    else {
      this.playPauseClass = 'fas fa-play fa-2x';
      this._events._onPause_Audio(e);
    }

  }
*/