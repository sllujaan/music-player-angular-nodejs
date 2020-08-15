import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';
import { SeekerControlsService } from './seeker-controls.service';
import { ShakaPlayerService } from './shaka-player.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngAfterViewInit() {
    console.log('dom loaded');

    //initializing dom elements in seeker service--
    this._seeker_service.setVariables(
      this.seeker_container.nativeElement,
      this.progress.nativeElement,
      this.buffer_seeker.nativeElement,
      this.dot_circle.nativeElement
      );

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

  

  title = 'music-player-angular';
  
  playerHidden = false
  
  constructor(
    public musics_api: MusicPlayerApiService,
    private render: Renderer2,
    public _seeker_service: SeekerControlsService,
    public _shaka_service: ShakaPlayerService
  ) { }
  
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











  


}
