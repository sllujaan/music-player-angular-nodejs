import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { MusicPlayerApiService } from '../music-player-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private music: MusicPlayerApiService) { }

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
    
    console.error("dom component is ready.")
    //this.musicsContainer.changes.subscribe()
    this.musicsContainer.changes.subscribe(observer => {
      console.log("ngFor rendered.")
    })

  }

  musicsList = null
  audio = null
  num = 400

  tags = []

  @ViewChild('musicsContainer', {static: true}) musicsContainer: QueryList<any>

  ngOnInit(): void {
    
    console.log(this.musicsContainer)



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

          if(this.musicsList.length > 0) {
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
          }

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
