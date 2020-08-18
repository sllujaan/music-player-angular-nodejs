import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MusicPlayerApiService } from '../music-player-api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(public musics_api: MusicPlayerApiService, private render: Renderer2) { }

  ngAfterViewInit(): void {
    console.warn("dom component is ready.")

    this.DOMLoaded = true;
    this.generateMusicsList(this.page);

    

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
  DOMLoaded = false

  tags = []

  @ViewChild('musicsContainer', {static: true}) musicsContainer: ElementRef
  //@ViewChild('playerContainer', {static: true}) playerContainer: ElementRef
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();



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
    this.loadMusic = true
    this.serverError = false
    //console.log("page = ", page)
    this.musics_api.getMusicsList(page)
    .subscribe(
      res => {
          //processing response-------
          this.res = res
          //console.log(this.res) 
          if(Array.isArray(this.res) && this.res.length > 0) {
            this.res.forEach(musisObj => {
              this.musicsList.push(musisObj)
            });
          }
          this.loadMusic = false
          //----------------------

      },
      err => {
        setTimeout(() => {
          this.loadMusic = false
          this.serverError = true
          this.page--;
          //console.error(err)
        }, 1000);
      }
    )
  }














  callParentToShowPlayer(e) {
    console.log(this.musicsList)

    var nameElm
    var picElm

    //(e.target.src) ? (picElm = e.target.src) : (nameElm = e.target.innerText)

    if(e.target.src) {
      picElm = e.target.src
      nameElm = e.target.parentElement.nextSibling.innerText

    }
    else {
      nameElm = e.target.innerText
      picElm = e.target.parentElement.querySelector('#contianer-image').src


    }



    this.musics_api.changeData({name: nameElm, picUrl: picElm, manifestUri: 'assets/dash/on_my_way_64kbps.mp'})  //'assets/dash/on_my_way_64kbps.mpd'
  }


}
