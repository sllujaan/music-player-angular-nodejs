import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import { MusicPlayerApiService } from '../music-player-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(public musics_api: MusicPlayerApiService, private render: Renderer2) { }

  ngAfterViewInit(): void {
    console.warn("dom component is ready.")

    this.generateMusicsList(this.page)

  }

  

  res: any
  arr = []
  musicsList = []
  audio = null
  nameElments = null
  pictureElements = null
  index = 0
  picIndex = 0
  page = 1

  tags = []

  @ViewChild('musicsContainer', {static: true}) musicsContainer: ElementRef

  ngOnInit(): void {

  }


  ngForRendered(music) {
    console.log("ngFor Rendered.")
    console.log(document.getElementsByClassName("music-container"))
  }

  onMusicsListGenerated(last) {
    if(last) console.warn("generated.")
  }
  

  initAudioEvents() {
    this.audio.addEventListener('canplay', () => {
      console.log("music can be played now!")
    })
  }

  generateMusicContainer(name, imageUrl) {
    const music_container = this.render.createElement('div');
    //this.render.setProperty(music_container, 'class', 'music-container')
    this.render.setAttribute(music_container, 'class', 'music-container')

    music_container.innerHTML = `<div class="picture" style="background-image: url('${imageUrl}');">
                                      <div class="play"><i class="fas fa-play fa-1x"></i></div>
                                  </div>
                                  <div class="name">${name}</div>`

    console.log(music_container)

  }



  generateMusicsList = (page) => {
    console.log("page = ", page)
    this.musics_api.getMusicsList(page)
    .subscribe(
      res => {
        this.res = res
        console.log(this.res) 
        if(this.res.length > 0) {
          this.res.forEach(musisObj => {
            this.musicsList.push(musisObj)
          });
        }
      },
      err => console.error(err)
    )
  }


}
