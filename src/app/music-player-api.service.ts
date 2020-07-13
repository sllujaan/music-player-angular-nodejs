import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerApiService {

  constructor(private http: HttpClient) { }

  PRODUCTION = true
  

  PRODUCTION_URL = `http://musicplayerpro.herokuapp.com/`
  LOCAL_URL = `http://localhost:3000/`


  UNIQUE_URL = this.PRODUCTION ?  (this.PRODUCTION_URL) : (this.LOCAL_URL)

  musicsListUrl = this.UNIQUE_URL + 'list/'


  getMusicsList(page) {
    return this.http.get(this.musicsListUrl + page)
  }
  getImageUrl(musicUrl) {
    return (this.UNIQUE_URL + musicUrl)
  }

  
  /* getMusic(musicName) {
    if(!musicName) throw Error("music name is required.")
    else return this.http.get(this.httpMusicUrl+musicName)
  }
  getTags(musicName) {
    if(!musicName) throw Error("music name is required.")
    else return this.http.get(this.httpMusicTagUrl+musicName)
  }

  getService() {
    return "music-player-service."
  } */
}

