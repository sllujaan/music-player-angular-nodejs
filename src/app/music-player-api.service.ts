import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerApiService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  httpUrl = `http://localhost:3000/list/`
  httpMusicUrl = `http://localhost:3000/audio/`
  httpMusicTagUrl = `http://localhost:3000/music/tag/`
  public httpSeverUrl = `http://localhost:3000/`

  getMusicsList(page) {
    return this.http.get(this.httpUrl + page)
  }
  getMusic(musicName) {
    if(!musicName) throw Error("music name is required.")
    else return this.http.get(this.httpMusicUrl+musicName)
  }
  getTags(musicName) {
    if(!musicName) throw Error("music name is required.")
    else return this.http.get(this.httpMusicTagUrl+musicName)
  }

  getService() {
    return "music-player-service."
  }

  getImageUrl(musicUrl) {
    return (this.httpSeverUrl + musicUrl)
  }

  getSanitizedUrl(musicUrl) {
    return this.sanitizer.bypassSecurityTrustStyle( this.getImageUrl(musicUrl) )
  }

}
