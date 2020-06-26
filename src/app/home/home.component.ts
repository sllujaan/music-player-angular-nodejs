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

  ngOnInit(): void {
    console.log(this.music.getService())
    
    this.music.getMusicsList()
    .subscribe(
      res => {
          this.musicsList = res
          this.music.getMusic(this.musicsList[0])
          .subscribe(
            res => console.log(res),
            err => console.error(err)
          )
      },
      err => console.error(err)
    )

  }

    

}
