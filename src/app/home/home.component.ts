import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MusicPlayerApiService } from '../music-player-api.service';
import { generate } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private music: MusicPlayerApiService) { }

  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
    
    console.warn("dom component is ready.")
    //this.musicsContainer.changes.subscribe()
    
    
    
    setTimeout(() => {
      var name = this.musicsContainer.nativeElement.querySelectorAll(".name")
      var picture = this.musicsContainer.nativeElement.querySelectorAll(".picture")
      console.log(name)
      console.log(name[0])
      this.nameElments = name
      this.pictureElements = picture

    }, 2000);
    
    
    /*
    console.log(this.musicsContainer)
    var musicsContainer = this.musicsContainer.nativeElement.getElementsByClassName("music-container")
    console.log(musicsContainer.length)

    setTimeout(() => {
      for (let i = 0; i < musicsContainer.length; i++) {
        var musicContainer = musicsContainer[i]
        var name = musicContainer.querySelectorAll(".name")[0]
        console.log(musicContainer)
        console.log(name)
      }
    }, 2000);
    

    console.log(musicsContainer)
    */
  }

  musicsList = null
  audio = null
  nameElments = null
  pictureElements = null
  index = 0
  picIndex = 0

  tags = []

  @ViewChild('musicsContainer', {static: true}) musicsContainer: ElementRef

  ngOnInit(): void {
    
    //console.log(this.musicsContainer)

    //var childs = this.musicsContainer.nativeElement.getElementsByClassName("music-container")
    //console.log(childs)



    this.handleFetchMusics()

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


  handleFetchMusics() {
    this.music.getMusicsList()
    .subscribe(
      res => {
          this.musicsList = res
          const url = this.music.httpMusicTagUrl + this.musicsList[2]
          console.log(url)

          if(this.musicsList.length > 0) {
            this.musicsList.forEach( musicName => {
              this.music.getMusicTag(musicName)
              .subscribe(
                res => {
                  
                  const tag = {title: res.title, album: res.album, artist: res.artist, genre: res.genre, year: res.year}
                  this.tags.push(tag)
                  console.log(res)
                  console.log(tag)
                  setTimeout( async () => {
                    this.nameElments[this.index++].innerText = tag.title
                    var imageUrl = await this.generateImageUrlAsync(res.image.imageBuffer.data)
                    this.pictureElements[this.picIndex++].style.setProperty("background-image", `url("${imageUrl}")`)
                    console.log(imageUrl)
                  }, 2000);
                  
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
















  async generateImageUrlAsync(imageBuffer) {
     
    //converting array buff to url image---------------------------
    var arrayBufferView = new Uint8Array( imageBuffer )
    var blob = new Blob([arrayBufferView], {type: "image/jpeg"})
    var urlCreator = window.URL || window.webkitURL
    var imageUrl = urlCreator.createObjectURL( blob )
    //---------------------------------------------------

    return imageUrl

    /*return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(imageUrl)
        }, 3000);
    })*/
}











}
