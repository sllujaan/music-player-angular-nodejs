import { Component, OnInit } from '@angular/core';
import { MusicPlayerApiService } from '../music-player-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private music: MusicPlayerApiService) { }

  musicsList = null
  audio = null

  ngOnInit(): void {
    console.log(this.music.getService())
    
    this.music.getMusicsList()
    .subscribe(
      res => {
          this.musicsList = res
          const url = this.music.httpMusicUrl + this.musicsList[2]
          console.log(url)
          this.audio = new Audio(url)
          this.initAudioEvents()
          
          /*
          this.music.getMusic(this.musicsList[0])
          .subscribe(
            res => console.log(res),
            err => console.error(err)
          )
          */
      },
      err => console.error(err)
    )

  }

  

  initAudioEvents() {
    this.audio.addEventListener('canplay', () => {
      console.log("music can be played now!")
    })
  }

}
