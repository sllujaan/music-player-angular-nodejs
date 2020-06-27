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
  num = 400

  tags = []

  ngOnInit(): void {
    
    this.handleFetchMusics()

  }

  

  initAudioEvents() {
    this.audio.addEventListener('canplay', () => {
      console.log("music can be played now!")
    })
  }


  handleFetchMusics() {
    this.music.getMusicsList()
    .subscribe(
      res => {
          this.musicsList = res
          const url = this.music.httpMusicTagUrl + this.musicsList[2]
          console.log(url)

          this.musicsList.forEach(musicName => {
            this.music.getMusicTag(musicName)
            .subscribe(
              res => {
                const tag = {title: res.title, album: res.album, artist: res.artist, genre: res.genre, year: res.year}
                this.tags.push(tag)
              },
              err => {console.error(err)}
            )
          });

          //this.audio = new Audio(url)
          //this.initAudioEvents()
          
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

}
