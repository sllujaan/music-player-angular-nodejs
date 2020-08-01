import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'music-player-angular';
  
  playerHidden = false
  
  constructor(public musics_api: MusicPlayerApiService, private render: Renderer2) { }
  
  ngOnInit(): void {

    this.showPlayer({name:"undef", picUrl:"undef"})
    
    this.musics_api.data$.subscribe(
      res => {
        console.log(res)
        this.showPlayer(res)
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





  
  showPlayer(obj) {

    const {name, picUrl} = obj

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
    console.log(e.target.className)
    const className = e.target.className;
    (className === 'fas fa-play fa-2x') ? (this.playPauseClass = 'fas fa-pause fa-2x') : (this.playPauseClass = 'fas fa-play fa-2x');


  }














}
