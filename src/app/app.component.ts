import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MusicPlayerApiService } from './music-player-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'music-player-angular';

  constructor(public musics_api: MusicPlayerApiService, private render: Renderer2) { }
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  @ViewChild('playerContainer', {static: true}) playerContainer: ElementRef

  hidePlayer(e) {

    console.log(e.target)

    var player = this.playerContainer.nativeElement
    
    this.render.setStyle(player, 'visibility', 'hidden')
    this.render.setStyle(player, 'opacity', '0')

    console.log(player)
    
  }





}
