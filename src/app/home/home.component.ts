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
  loadMusic = false
  serverError = false

  tags = []

  @ViewChild('musicsContainer', {static: true}) musicsContainer: ElementRef
  @ViewChild('playerContainer', {static: true}) playerContainer: ElementRef

  ngOnInit(): void {

    const url = this.musics_api.getImageUrl('cover/Walker/Alan Walker-The Spectre.mp3')
    console.log(url)
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

    this.loadMusic = true
    this.serverError = false

    console.log("page = ", page)
    this.musics_api.getMusicsList(page)
    .subscribe(
      res => {

        setTimeout(() => {
          //processing response-------
          this.res = res
          console.log(this.res) 
          if(this.res.length > 0) {
            this.res.forEach(musisObj => {
              this.musicsList.push(musisObj)
            });
          }
          this.loadMusic = false
          //-----------------------
          
        }, 1000);

      },
      err => {
        setTimeout(() => {
          this.loadMusic = false
          this.serverError = true
          this.page--;
          console.error(err)
        }, 1000);
      }
    )
  }














  showPlayer(e) {
    //const nameElm = e.target.parentElement.querySelector('.name')
    //const picElm = e.target.parentElement.querySelector('.picture')

    var nameElm
    var picElm

    //(e.target.src) ? (picElm = e.target.src) : (nameElm = e.target.innerText)

    if(e.target.src) {
      picElm = e.target.src
      nameElm = e.target.parentElement.nextSibling.innerText
      
      console.log(picElm)
      console.log(nameElm)
    }
    else {
      nameElm = e.target.innerText
      picElm = e.target.parentElement.querySelector('#contianer-image').src

      console.log(picElm)
      console.log(nameElm)
    }

    


    var player = this.playerContainer.nativeElement

    
    var player_picElm = player.querySelector('#play-image')
    var player_nameElm = player.querySelector('#player-name')


    player_nameElm.innerText = nameElm
    player_picElm.src = picElm
    

    this.render.setStyle(player, 'visibility', 'visible')
    this.render.setStyle(player, 'opacity', '1')
    

  }
  
  hidePlayer(e) {

    console.log(e.target)

    var player = this.playerContainer.nativeElement
    
    this.render.setStyle(player, 'visibility', 'hidden')
    this.render.setStyle(player, 'opacity', '0')

    console.log(player)
    
  }


}
